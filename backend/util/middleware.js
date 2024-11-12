const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')

const tokenExtractor = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]

if (!token) {
  return res.status(403).json({ message: 'Access denied, no token provided' })
}

jwt.verify(token, SECRET, (err, decoded) => {
  if (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  req.oktaUserId = decoded.sub
  next()
})
}

module.exports = { tokenExtractor }