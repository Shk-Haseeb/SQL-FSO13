const router = require('express').Router()
const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)

  if (!readingList) {
    return res.status(404).json({ error: 'Reading list entry not found' })
  }

  if (readingList.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: 'Forbidden: not your reading list item' })
  }

  readingList.read = req.body.read
  await readingList.save()

  res.json(readingList)
})

module.exports = router
