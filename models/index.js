const User = require('./user')
const Blog = require('./blog')
const ReadingList = require('./reading_list')

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' })

module.exports = {
  User, Blog, ReadingList
}
