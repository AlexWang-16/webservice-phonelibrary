const express = require('express')
const app = express()
const PNF = require('google-libphonenumber')
  .PhoneNumberFormat
const phoneUtil = require('google-libphonenumber')
  .PhoneNumberUtil.getInstance()

function get(req, res) {
  // Currently only parases one number
  try{
    let result = phoneUtil.parse(decodeURIComponent(req.params.input))
    let formattedNumber = phoneUtil.format(result, PNF.INTERNATIONAL)
    res.json([formattedNumber])
  }catch(e){ 
    res.status(500)
      .json({message: `${e}`})
  }
}

function post(req, res){
  let input = req.body.text

  //Response
  // res.type('application/json')
  // res.status(200).json({response: `${req.body.text}`})
}

module.exports = {
  get,
  post
}