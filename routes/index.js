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
          URI: `/api/extract/phone/numbers/QueryString`,
          QueryString: 'up to 8kb of text with phone numbers',
          RequestBody: 'None'
        },
        POST: {
          URI: `/api/extract/phone/numbers/`,
          QueryString: 'None',
          RequestBody: `A property named 'text' with up to 100kb of text with phone numbers`
        }
      }
    })
}

module.exports = {
  get
}