const authRoutes = require('../routes/auth')
const bookRoutes = require('../routes/book')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/book', bookRoutes)
}
