const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Enable json parsing
app.use(bodyParser.json())

// Dependencies
const root_endpoint = require('./routes/index')
const extract_phone_number = require('./routes/api/extract/phone_number')

// GET routes
app.get('/', root_endpoint.get)
app.get('/api/extract/phone/numbers/:input_text', extract_phone_number.get)

// POST routes
app.post('/api/extract/phone/numbers/', extract_phone_number.post) 

app.listen(3000, () => console.log('Phone number extractor web service app now listening at port 3000'))