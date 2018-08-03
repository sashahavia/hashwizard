const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/uploads', require('./uploads'))
router.use('/google', require('./google'))
router.use('/watson', require('./watson'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
