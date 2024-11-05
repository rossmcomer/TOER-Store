const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

app.use(cors())

const saveOrderInfoRouter = require('./controllers/stripe-webhook')
app.use('/api/stripe-webhook', express.raw({ type: 'application/json' }), saveOrderInfoRouter)

app.use(express.json())

const checkoutRouter = require('./controllers/create-checkout-session')
const productsRouter = require('./controllers/products')

app.use('/api/products', productsRouter)
app.use('/api/create-checkout-session', checkoutRouter)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error) {
    return res.status(400).send({ error: 'something went wrong' })
  }
  next(error)
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
