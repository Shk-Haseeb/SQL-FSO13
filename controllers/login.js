const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { SECRET } = require('../util/config')
const { User } = require('../models')

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })

  const passwordCorrect = password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  if (user.disabled) {
    return res.status(401).json({ error: 'account disabled' })
  }

  const token = jwt.sign({ username: user.username, id: user.id }, SECRET)

  await Session.create({ token, userId: user.id })

  res.status(200).send({
    token, username: user.username, name: user.name
  })
})


module.exports = router
