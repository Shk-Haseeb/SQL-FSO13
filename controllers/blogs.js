const router = require('express').Router()
const { Blog, User } = require('../models')
const { Op } = require('sequelize')


const tokenExtractor = require('../middleware/tokenExtractor')
const { User } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]
  }

  const blogs = await Blog.findAll({
    where,
    include: {
      model: User,
      attributes: ['id', 'name', 'username']
    },
    order: [['likes', 'DESC']]
  })

  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (!user) {
    return res.status(401).json({ error: 'invalid token user' })
  }

  const blog = await Blog.create({
    ...req.body,
    userId: user.id
  })

  res.status(201).json(blog)
})

router.get('/:id', blogFinder, (req, res) => {
  req.blog ? res.json(req.blog) : res.status(404).end()
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  const userIdFromToken = req.decodedToken.id

  if (blog.userId !== userIdFromToken) {
    return res.status(403).json({ error: 'SORRY!: blog does not belong to you' })
  }

  await blog.destroy()
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  if (!req.blog) return res.status(404).end()

  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router

