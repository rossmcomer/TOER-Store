const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const {
  Product,
  ProductImage,
  Category,
  Order,
  OrderDetail,
} = require('../models')

router.get('/', tokenExtractor, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { oktaUserId: req.oktaUserId },
      include: [{ model: OrderDetail, as: 'order_details' }],
    })

    res.json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
