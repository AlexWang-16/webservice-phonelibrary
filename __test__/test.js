const request = require('supertest')
const app = require('../app')
const sampleFilesDir = `__test__`

describe('Root endpoint', () => {
  it('Should show web service options', () => {
    return request(app)
      .get("/")
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect.assertions(8);
        expect(response.body.AppName)
          .toBe("Phone number extractor web service")

        //GET assertions
        expect(response.body.Methods.GET.URI).toBe("/api/phonenumbers/parse/text/{RequestSegment}")
        expect(response.body.Methods.GET.RequestSegment).toBe("a string of up to 8kb of text with phone number")
        expect(response.body.Methods.GET.RequestBody).toBe('None')

        //POST assertions
        expect(response.body.Methods.POST.URI).toBe("/api/phonenumbers/parse/file/")
        expect(response.body.Methods.POST.RequestSegment).toBe("None")
        expect(response.body.Methods.POST.RequestBody).toBe("A file of containing base64 encoded text file under property name 'textFile'")
        expect(response.body.Methods.POST.Header).toBe("Content-Type: text/plain")
      })
      .catch (e => {
        throw new Error(e)
      })
  })
})

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
  })

  describe('POST', () => {
    it('A file with 3 valid numbers should return them back', () => {
      return request(app)
        .post("/api/phonenumbers/parse/file")
        .attach('textFile', `${sampleFilesDir}/sampleTextFile.txt`)
        .expect(200)
        .then(res => {
          expect.assertions(5)
          expect(res.body.length).toEqual(4)
          expect(res.body[0]).toBe('+1(416)491-5050')
          expect(res.body[1]).toBe('+1(416) 123-1234')
          expect(res.body[2]).toBe('(647) 111-2223')
          expect(res.body[3]).toBe('222-1234')
        })
    })

    it('A file with duplicate numbers should not return duplicates')

    it('North American numbers over 11 digits should not be returned')

    it('Invalid international numbers should not return')      
  })
})
