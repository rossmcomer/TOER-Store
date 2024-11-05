const { STRIPE_SECRET, STRIPE_WEBHOOK_SECRET, DEV_WEBHOOK_SECRET } = require ('../util/config')
const stripe = require('stripe')(STRIPE_SECRET)
const router = require('express').Router()
const { Order, OrderDetail, Product } = require('../models')

router.post('/', async (req, res) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, DEV_WEBHOOK_SECRET)
        console.log(event)
      } catch (err) {
        console.log('bigly error', err.message)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
    
    // switch (event.type) {
    //     case 'checkout.session.completed':
    //         const checkoutSessionCompleted = event.data.object
            
    //         const customerName = session.customer_details.name
    //         const customerEmail = session.customer_details.email
    //         const orderDate = new Date(session.created * 1000)
    //         const totalAmount = session.amount_total / 100

    //         try {
    //           // Save to orders table
    //           const newOrder = await Order.create({
    //             order_date: orderDate,
    //             customer_name: customerName,
    //             customer_email: customerEmail,
    //             total_amount: totalAmount
    //           })
        
    //           // Retrieve line items from the session to save in order_details table
    //           const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
        
    //           // Save each item in order_details table
    //           // for (const item of lineItems.data) {

    //           // const product = await Product.findOne({
    //           //   where: { name: productName, size: size }
    //           // })
    //           //   await OrderDetail.create({
    //           //     order_id: newOrder.id,
    //           //     product_id: item.price.product,
    //           //     quantity: item.quantity,
    //           //     unit_price: item.price.unit_amount / 100
    //           //   })
    //           // }

    //           console.log(newOrder, 'newOrder')
    //           console.log(lineItems, 'lineItems')
        
    //           res.status(200).send()
    //         } catch (error) {
    //           console.error('Error saving order to database:', error)
    //           res.status(500).send('Internal Server Error')
    //         }

    //         break
    //     case 'payment_intent.payment_failed':
    //         const paymentIntentPaymentFailed = event.data.object;
    //         // Then define and call a function to handle the event payment_intent.payment_failed
    //         break
    //     case 'payment_intent.succeeded':
    //         const paymentIntentSucceeded = event.data.object;
    //         // Then define and call a function to handle the event payment_intent.succeeded
    //         break
    //     // ... handle other event types
    //     default:
    //         console.log(`Unhandled event type ${event.type}`)
    // }
    
      console.log(`Unhandled event type ${event.type}`)
    
      // Return a 200 response to acknowledge receipt of the event
      res.send()

})

module.exports = router