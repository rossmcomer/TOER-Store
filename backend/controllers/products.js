const router = require('express').Router()
const { Product, ProductImage, Category, Supplier } = require('../models')

router.get('/', async (req, res) => {
    try {
    const products = await Product.findAll({
        include: [
          { model: Category, attributes: ['name'] },
          { model: Supplier, attributes: ['name'] },
          { model: ProductImage, attributes: ['imageUrl'], as: 'images' }
        ]
      })
      res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch products' })
    }
})

module.exports = router