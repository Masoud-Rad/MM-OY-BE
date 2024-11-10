const request = require("supertest");
const app = require("../app")
const connection = require("../db/connection")
const seed = require("../db/seeds/seed")

const devData = require('../db/data/test-data/index');
const { expect } = require("@jest/globals");



beforeEach(() => seed(devData))
afterAll(() => connection.end())



describe('incorect api/getApi', () => {
    test("GET - status: 404 - not exist", () => {
      return request(app)
        .get("/nonsence")
        .expect(404)
        .then((response) => {
          expect(typeof response).toBe('object');
          expect(response.body.msg).toBe("Not Found!")
        });
    });
  })       
  
describe('getting company name and logo url', ()=>{
  test('GET - status: 200 - respond with an abject containing companyName and logoUrl', ()=>{
    return request(app)
      .get("/api/companyDetails")
      .expect(200)
      .then((response)=>{
        console.log("ressss in test:", response.body.companyDetails[0])
        
        const result = response.body.companyDetails[0];
        expect(typeof result).toBe("object")
        expect(result.hasOwnProperty('company_name')).toBe(true)
        expect(result.hasOwnProperty('logo_url')).toBe(true)

        
      })
  })
})