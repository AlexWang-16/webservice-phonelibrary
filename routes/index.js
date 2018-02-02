const express = require('express')
const app = express()
const bodyParser = require('body-parser')

function get(req, res){
  res.type('application/json')
  res.json(
    {
      AppName: `Phone number extractor web service`,
      Version: `1.2.7`,
      Methods: {
        GET: {
          URI: `/api/phonenumbers/parse/text/{RequestSegment}`,
          RequestSegment: 'a string of up to 8kb of text with one phone number',
          RequestBody: 'None'
        },
        POST: {
          URI: `/api/phonenumbers/parse/file/`,
          RequestSegment: 'None',
          RequestBody: `A file containing base64 encoded text file under property name 'textFile'. Can contain multiple international formatted North American numbers`,
          Header: `Content-Type: text/plain`
        }
      }
    })
}

module.exports = {
  get
}