const {
  STRIPE_SECRET,
  STRIPE_WEBHOOK_SECRET,
  DEV_WEBHOOK_SECRET,
} = require('../util/config')
const stripe = require('stripe')(STRIPE_SECRET)
const router = require('express').Router()
const { Order, OrderDetail, Product } = require('../models')

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object

      const customerName = checkoutSessionCompleted.customer_details.name
      const customerEmail = checkoutSessionCompleted.customer_details.email
      const orderDate = new Date(checkoutSessionCompleted.created * 1000)
      const totalAmount = checkoutSessionCompleted.amount_total / 100
      const salesTax = checkoutSessionCompleted.total_details.amount_tax / 100
      const oktaUserId = checkoutSessionCompleted.metadata.oktaUserId

      try {
        // Save to orders table
        const newOrder = await Order.create({
          orderDate: orderDate,
          customerName: customerName,
          customerEmail: customerEmail,
          totalAmount: totalAmount,
          salesTax: salesTax,
          oktaUserId: oktaUserId,
        })

        // Retrieve line items from the session to save in order_details table
        const lineItems = await stripe.checkout.sessions.listLineItems(
          checkoutSessionCompleted.id,
        )

        // Save each item in order_details table
        for (const item of lineItems.data) {
          const description = item.description

          const match = description.match(/^(.+?)(?: \(Size: (\w+)\))?$/)

          if (match) {
            const productName = match[1]
            const size = match[2] || null

            const product = await Product.findOne({
              where: {
                name: productName,
                size: size !== null ? size : null,
              },
            })

            if (product) {
              await OrderDetail.create({
                orderId: newOrder.id,
                productId: product.id,
                quantity: item.quantity,
                unitPrice: item.price.unit_amount / 100,
                salesTax: item.amount_tax / 100,
              })

              product.unitsInStock -= item.quantity
              await product.save()
            }
          }
        }

        res.send()
      } catch (error) {
        console.error('Error saving order to database:', error)
        res.status(500).send('Internal Server Error')
      }

      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
})

module.exports = router
