const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to the database')
  } catch (error) {
    console.error('Failed to connect to the database:', error)
    process.exit(1)
  }
}

module.exports = { sequelize, connectToDatabase }
