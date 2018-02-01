const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const app = express()
const PNF = require('google-libphonenumber').PhoneNumberFormat
const PNT = require('google-libphonenumber').PhoneNumberType
const phoneUtil = require('google-libphonenumber')
  .PhoneNumberUtil.getInstance()

// multer config to listen for textFile field from client
const upload = multer({ dest: 'uploads/'}).single('textFile')

function post(req, res){
  upload(req, res, err => {
    if (err) {
      //Handle error
      console.log('An error occured')
      console.log(err)
      if (err.code === 'LIMIT_UNEXPECTED_FILE'){
        res.status(400)
          .json({error: "field name for filename needs to be 'textField'"})
      }else{
        res.status(500)
          .json({error:"File not accepted. Internal server error occured."}, err)
      }
    }else{
      let contents = fs.readFileSync(req.file.path, 'utf8', function(err, buf){
        if(err){
          console.error('file open error: ', err)
        }
      })
      // Convert base 64 contents to regular UTF-8 text
      let convertedText = new Buffer(contents, 'base64').toString()
      try{
        let result = parseForNumbers(convertedText)
        // let formattedNumber = phoneUtil.format(result, PNF.INTERNATIONAL)
        
        res.status(200).json(result)
        // Delete file
        fs.unlinkSync(req.file.path)
      }catch(e){
        res.status(500)
          .json({error: `${e}`})
      }
    }
  })
}

function parseForNumbers(content){
  let filter = /\+*[()\d]+\s{0,1}[\d-]+/g
  let numbersFound = content.match(filter)
  let results = []
  // numbersFound.forEach(number => {
    /* TODO: Validation code to ensure the numbers are valid */
  // })
  return numbersFound
}

module.exports = {
  post
}