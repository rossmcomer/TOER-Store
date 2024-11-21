const router = require('express').Router()
const { Category } = require('../models')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

module.exports = router
