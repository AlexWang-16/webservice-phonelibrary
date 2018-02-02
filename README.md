# Phone Library Web Service
A web service built using Node.JS that uses Google's phone library to parse a string and return phone numbers found in a text file or as part of a URI segment

## User Requirements
* [Node JS](https://nodejs.org/en/download/) 
* [Postman](https://www.getpostman.com) or a non-browser client app capable of performing HTTP requests

## Installation/Setup
1. Clone the repository
2. Navigate to the repository directory and execute `npm install` to obtain packages

## Usage
1. Start the server by executing `npm start` in the repository directory
2. Launch Postman/HTTP client
3. Perform a GET request to `localhost:3000/` to retrieve all possible URIs and usage information regarding the web service
4. Perform a GET request using provided information from root endpoint
5. Perform a POST request using provided information from POST endpoint

**Note**: Web service will respond only with JSON data

## Unit Testing
Execute `npm test` in the repository directory

All test codes are placed inside `__test__` directory. Please include all sample test files into `__test__/sampleFiles` directory.

## Contributing
Please send pull requests for fixes, updates and new features.

## Dependencies
* [Node JS](https://nodejs.org/en/download/) - A JavaScript runtime built on Chrome's V8 JavaScript engine

* [google-libphonenumber](https://github.com/ruimarinho/google-libphonenumber) - An up to date version of [Google's libphonenumber](https://github.com/googlei18n/libphonenumber) packaged for Node JS

* [SuperTest](https://github.com/visionmedia/supertest) - Unit testing framework for HTTP requests

* [Express JS](https://github.com/expressjs) - Fast minimalist framework for Node JS
