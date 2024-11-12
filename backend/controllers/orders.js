const jwt = require('jsonwebtoken');
const router = require('express').Router()
const { Product, ProductImage, Category, Order, OrderDetail } = require('../models')

router.get('/', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

    try {
        const orders = await Order.findAll({
          where: { oktaUserId },
          include: [{ model: OrderDetail, as: 'order_details' }],
        })
    
        res.json(orders)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
      }
})

module.exports = router