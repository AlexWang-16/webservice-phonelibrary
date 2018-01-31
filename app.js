const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()

// Enable json parsing
app.use(bodyParser.json())

// multer configs
const upload = multer({ dest: 'uploads/'})

// Dependencies
const root_endpoint = require('./routes/index')
const parseText = require('./routes/api/phonenumbers/parse/text')
const parseFile = require('./routes/api/phonenumbers/parse/file')

// GET routes
app.get('/', root_endpoint.get)
app.get('/api/phonenumbers/parse/text/:input', parseText.get)

// POST routes
app.post('/api/phonenumbers/parse/file/', upload.single('textFile'), parseFile.post) 

app.listen(3000, function() {
  console.log(`Phone number extractor web service app now listening at port ${this.address().port}`)
})

module.exports = app