const request = require('supertest')
const app = require('../app')
const sampleFilesDir = `__test__/sampleFiles`

describe('Extract Phone Number', () => {
  describe('GET', () => {
    it('A string with one number should return the number in array form', () => {
      return request(app)
        .get("/api/phonenumbers/parse/text/My%20number%20is%20+1%20(416)%20491-5050")
        .expect(200)
        .then(res => {
          expect.assertions(1)
          expect(res.body)
            .toEqual(expect.arrayContaining(["+1 416-491-5050"]))
        })
    })
    it('A string with no phone number should return []', () => {
      return request(app)
      .get("/api/phonenumbers/parse/text/some%20random%20text")
      .expect(200)
      .then(res => {
        expect.assertions(2)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body.length).toEqual(0)
      })
    }) 

    it('1-800 numbers should be parsed properly')
    it('1-800 numbers with letters should be parsed properly')
    it('Multiple international formatted numbers in string should parse properly')
  })

  describe('POST', () => {
    it('A file with 5 numbers should return only 2 international formatted numbers', () => {
      return request(app)
        .post("/api/phonenumbers/parse/file")
        .attach('textFile', `${sampleFilesDir}/validNumbers.txt`)
        .expect(200)
        .then(res => {
          expect.assertions(3)
          expect(res.body.length).toEqual(2)
          expect(res.body[0]).toBe('+1(416)491-5050')
          expect(res.body[1]).toBe('+1(416) 123-1234')
        })
    })

    it('A file with duplicate numbers should not return duplicates', () => {
      return request(app)
        .post("/api/phonenumbers/parse/file")
        .attach('textFile', `${sampleFilesDir}/duplicateNumbers.txt`)
        .expect(200)
        .then(res => {
          expect.assertions(2)
          expect(res.body.length).toEqual(1)
          expect(res.body[0]).toBe('+1(647)555-6666')
        })
    })

    it('North American numbers over 11 digits should not be returned',() => {
      return request(app)
        .post("/api/phonenumbers/parse/file")
        .attach('textFile', `${sampleFilesDir}/tooLongNumber.txt`)
        .expect(200)
        .then(res => {
          expect(res.body.length).toEqual(0)
          expect(Array.isArray(res.body)).toBeTruthy()
        })
    })

    it('1-800 numbers should be parsed properly')
    it('1-800 numbers with letters should be parsed properly')
    it('Global international numbers should parse properly')
    it('Numbers in PDF file should be extracted properly')
    it('Local numbers without country code should parse properly')      
  })
})