const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read === 'true') {
    where.read = true
  } else if (req.query.read === 'false') {
    where.read = false
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['id', 'name', 'username'],
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['id', 'read'],
          where,
        }
      }
    ]
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

router.post('/', async (req, res) => {
  try {
    const { username, name } = req.body
    if (!username || !name) {
      return res.status(400).json({ error: 'username and name are required' })
    }

    const user = await User.create({ username, name })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })

  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  const newUsername = req.body.username

  if (!newUsername) {
    return res.status(400).json({ error: 'new username required' })
  }

  user.username = newUsername
  await user.save()

  res.json(user)
})

module.exports = router
