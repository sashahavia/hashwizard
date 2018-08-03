const router = require('express').Router()
const axios = require('axios')
module.exports = router

// POST /api/google/api
router.post('/api', async (req, res, next) => {
  // console.log('Req.body', req.body)
  try {
    const {data} = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${
        process.env.GOOGLE_VISION_API_KEY
      }`,
      req.body
    )
    // console.log('Data ', data)
    if (!data) {
      const err = new Error('Data not found')
      err.status(404)
      return next(err)
    }
    res.json(data)
  } catch (err) {
    next(err)
  }
})
