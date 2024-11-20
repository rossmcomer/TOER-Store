const { STRIPE_SECRET, DOMAIN_NAME } = require('../util/config')
const stripe = require('stripe')(STRIPE_SECRET)
const router = require('express').Router()
const { Product } = require('../models')

router.post('/', async (req, res) => {
  const { products, oktaUserId } = req.body

  for (const product of products) {
    const dbProduct = await Product.findByPk(product.id)

    if (dbProduct.unitsInStock < product.quantity) {
      return res.status(400).json({
        error: `Insufficient stock for product: ${dbProduct.name}. Available: ${dbProduct.unitsInStock}, Requested: ${product.quantity}`,
      })
    }
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.size
          ? `${product.name} (Size: ${product.size})`
          : product.name,
        images: [product.images[0].imageUrl],
      },
      unit_amount: Math.round(product.unitPrice * 100),
    },
    quantity: product.quantity,
  }))

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${DOMAIN_NAME}/success`,
      cancel_url: `${DOMAIN_NAME}/cancel`,
      automatic_tax: { enabled: true },
      metadata: { oktaUserId: oktaUserId },
    })

    res.json({ id: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
