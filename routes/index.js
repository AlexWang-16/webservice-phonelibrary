const express = require('express')
const app = express()
const bodyParser = require('body-parser')

function get(req, res){
  res.type('application/json')
  res.json(
    {
      AppName: `Phone number extractor web service`,
      Version: 1,
      Methods: {
        GET: {
          URI: `/api/phonenumbers/parse/text/{RequestSegment}`,
          RequestSegment: 'a string of up to 8kb of text with phone number',
          RequestBody: 'None'
        },
        POST: {
          URI: `/api/phonenumbers/parse/file/`,
          RequestSegment: 'None',
          RequestBody: `A file of containing base64 encoded text file`,
          Header: `Content-Type: text/plain`
        }
      }
    })
}

module.exports = {
  get
}