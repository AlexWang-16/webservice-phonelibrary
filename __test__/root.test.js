const request = require('supertest')
const app = require('../app')
const sampleFilesDir = `__test__/sampleFiles`

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
