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
      console.error('An error occured')
      if (err.code === 'LIMIT_UNEXPECTED_FILE'){
        res.status(400)
          .json({error: "Field name for filename needs to be 'textFile'"})
      }else{
        res.status(500)
          .json({error:`File not accepted. Internal server error occured. ${err}`})
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
        
        res.status(200).json(result)
        // Delete file
        fs.unlinkSync(req.file.path)
      }catch(e){
        res.status(500)
          .json([])
      }
    }
  })
}

function parseForNumbers(content){
  
  //fullFormatNumbers mean international format for North America only
  // i.e. +1(647)111-2222
  let fullFormatNumbers = /\+\d{0,1}\({0,1}\d{0,3}\){0,1}\s{0,1}\d{3}\-\d+/g
  let fullFormatNumbersFound = content.match(fullFormatNumbers)

  /* Detect phone numbers too long */
  for (let i = 0; i < fullFormatNumbersFound.length; i++){
    let trimmedStr = fullFormatNumbersFound[i].replace(/\s/g, '')
    if (trimmedStr.length > 15){
      fullFormatNumbersFound.splice(i, 1)
    }
  }

  fullFormatNumbersFound = fullFormatNumbersFound.filter(function(num, index, self) {
    return self.indexOf(num) == index
  })

  return fullFormatNumbersFound
}

module.exports = {
  post
}

