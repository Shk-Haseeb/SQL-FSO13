const router = require('express').Router()
const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body

  try {
    const entry = await ReadingList.create({
      blogId,
      userId
    })
    res.status(201).json(entry)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
