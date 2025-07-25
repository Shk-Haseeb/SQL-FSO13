const errorHandler = (error, req, res, next) => {
  console.error('Error:', error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }

  return res.status(500).json({ error: 'Something went wrong' })
}

module.exports = errorHandler
