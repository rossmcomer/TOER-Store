const { STRIPE_SECRET, DOMAIN_NAME } = require('../util/config')
const stripe = require('stripe')(STRIPE_SECRET)
const router = require('express').Router()

router.post('/', async (req, res) => {

})

module.exports = router