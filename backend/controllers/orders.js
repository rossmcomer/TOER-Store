const router = require('express').Router()
const { Product, ProductImage, Category, Order, OrderDetail } = require('../models')

router.get('/', async (req, res) => {
    const { email } = req.query

    try {
        const orders = await Order.findAll({
          where: { oktaUserId: email },
          include: [{ model: OrderDetail, as: 'details' }],
        })
    
        res.json(orders)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
      }
})

module.exports = router