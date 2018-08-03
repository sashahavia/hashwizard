const router = require('express').Router()
module.exports = router

var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3')

var languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  iam_apikey: process.env.LANGUAGE_TRANSLATOR_API_KEY
})

router.post('/api', (req, res, next) => {
  // console.log('req.body', req.body)
  // console.log('Lang', req.body.lang)
  // console.log('Text', req.body.text)
  languageTranslator.translate(
    {
      text: req.body.text,
      source: 'en',
      target: req.body.lang
    },
    function(err, translation) {
      if (err) console.log('error:', err)
      else res.send(translation.translations[0].translation)
    }
  )
})
