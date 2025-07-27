const errorHandler = (error, req, res, next) => {
  console.error('Error:', error)

  if (error.name === 'SequelizeValidationError') {
    const messages = error.errors.map(e => e.message)
    return res.status(400).json({ error: messages })
  }

  return res.status(500).json({ error: 'Something went wrong' })
}

module.exports = errorHandler
