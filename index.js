require('express-async-errors')
const express = require('express')
const app = express()
const usersRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')


const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogRouter = require('./controllers/blogs')
const errorHandler = require('./middleware/errorHandler')
const loginRouter = require('./controllers/login')

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(errorHandler)
app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
