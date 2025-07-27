const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const auth = req.get('authorization')
  if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    const token = auth.substring(7)
    const decoded = jwt.verify(token, SECRET)
    const session = await Session.findOne({ where: { token } })

    if (!session) {
      return res.status(401).json({ error: 'invalid or expired session' })
    }

    const user = await User.findByPk(decoded.id)
    if (user.disabled) {
      return res.status(401).json({ error: 'account disabled' })
    }

    req.user = user
    req.token = token
    next()
  } catch {
    return res.status(401).json({ error: 'token invalid' })
  }
}

module.exports = {
  tokenExtractor
}