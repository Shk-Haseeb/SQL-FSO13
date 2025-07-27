const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const currentYear = new Date().getFullYear()

class Blog extends Model {}

Blog.init({
  author: DataTypes.TEXT,
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1991,
        msg: 'Year must be 1991 or later'
      },
      max: {
        args: currentYear,
        msg: `Year must not exceed ${currentYear}`
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

module.exports = Blog
