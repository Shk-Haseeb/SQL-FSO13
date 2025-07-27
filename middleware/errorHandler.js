const errorHandler = (error, req, res, next) => {
  console.error(error.name)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: error.errors.map(e => e.message)
    })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: error.errors.map(e => e.message)
    })
  }

  return res.status(500).json({ error: 'something went wrong' })
}

module.exports = { errorHandler }
