const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')
const { AUTH0_ISSUER } = require('./config.js')

const client = jwksClient({
  jwksUri: `${AUTH0_ISSUER}/.well-known/jwks.json`,
})

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err)
    }
    const signingKey = key.getPublicKey()
    callback(null, signingKey)
  })
}

const tokenExtractor = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' })
  }

  jwt.verify(
    token,
    getKey,
    {
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' })
      }

      req.oktaUserId = decoded.sub
      next()
    },
  )
}

module.exports = { tokenExtractor }
