const express = require('express')
const app = express()


function get(req, res) {
  res.json(`Input text was ${req.params.input_text}`)
}

function post(req, res){
  res.type('application/json')
  res.status(200).json({response: `${req.body.text}`})
}

module.exports = {
  get,
  post
}