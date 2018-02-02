const app = require('./app.js')

// Set port number
var port = process.env.PORT || 3000

app.listen(port, function() {
  console.log(`Phone number extractor web service app now listening at port ${port}`)
})