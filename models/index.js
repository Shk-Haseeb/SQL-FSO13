const Blog = require('./note')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

User.sync()
Blog.sync()

module.exports = {
  Blog,
  User
}
