const router = require('express').Router()
const { Product, ProductImage, Category, Order, OrderDetail } = require('../models')

router.get('/', async (req, res) => {
    const { email } = req.query

    try {
        const orders = await Order.findAll({
          where: { customerEmail: email },
          include: [{ model: OrderDetail, as: 'details' }],
        })
    
        res.json(orders) // Send the result as JSON
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
      }
})

module.exports = router