const router = require('express').Router()
const { Product, ProductImage, Category, Supplier } = require('../models')

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      exclude: ['category_id', 'supplier_id'],
      include: [
        { model: Category, attributes: ['name'] },
        { model: Supplier, attributes: ['name'] },
        { model: ProductImage, attributes: ['imageUrl'], as: 'images' },
      ],
    })
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.get('/:name', async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name)
    const products = await Product.findAll({
      where: { name },
      include: [
        { model: ProductImage, attributes: ['imageUrl'], as: 'images' },
        { model: Category, attributes: ['name'] },
        { model: Supplier, attributes: ['name'] },
      ],
    })

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

module.exports = router
