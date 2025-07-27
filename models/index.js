const User = require('./user')
const Blog = require('./blog')
const ReadingList = require('./reading_list')
const Session = require('./session')

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' })
Session.belongsTo(User)

module.exports = {
  User, Blog, ReadingList, Session
}
