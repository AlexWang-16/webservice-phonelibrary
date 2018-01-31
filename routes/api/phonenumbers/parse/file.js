const express = require('express')
const multer = require('multer')
const app = express()
const PNF = require('google-libphonenumber')
  .PhoneNumberFormat
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
          .json({error: "File not accepted. Internal server error occured."}, err)
      }
    }else{
      console.log(req.file)
      res.sendStatus(200)
    }
  })

  
  // let input = req.file
  // console.log(input)
  
  // try{
  //   let result = phoneUtil.parse(decodeURIComponent(req.params.input))
  //   let formattedNumber = phoneUtil.format(result, PNF.INTERNATIONAL)
  //   res.json([formattedNumber])
  // }catch(e){ 
  //   res.status(500)
  //     .json({message: `${e}`})
  // }

  //Response
  // res.type('application/json')
  // res.status(200).json({response: `${req.body.text}`})
}

module.exports = {
  post
}