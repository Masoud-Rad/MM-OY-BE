const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");

const devData = require("../db/data/test-data/index");
const { expect, describe } = require("@jest/globals");

beforeEach(() => seed(devData));
afterAll(() => connection.end());

describe("Incorect api/getApi", () => {
  test("GET - status: 404 - not exist", () => {
    return request(app)
      .get("/nonsence")
      .expect(404)
      .then((response) => {
        expect(typeof response).toBe("object");
        expect(response.body.msg).toBe("Not Found!");
      });
  });
});

describe("Getting company name and logo url", () => {
  test("GET - status: 200 - respond with an abject containing companyName and logoUrl", () => {
    return request(app)
      .get("/api/companyDetails")
      .expect(200)
      .then((response) => {
        const result = response.body.companyDetails[0];
        expect(typeof result).toBe("object");
        expect(result.hasOwnProperty("company_name")).toBe(true);
        expect(result.hasOwnProperty("logo_url")).toBe(true);
      });
  });
});

describe("Getting mainPageData", () => {
  test("GET - status: 200 - respond with an abject containing mainPageData", () => {
    return request(app)
      .get("/api/mainPageData")
      .expect(200)
      .then((response) => {
        const result = response.body.mainPageData[0];
        expect(typeof result).toBe("object");
        expect(result.hasOwnProperty("title")).toBe(true);
        expect(result.hasOwnProperty("subtitle")).toBe(true);
        expect(result.hasOwnProperty("content")).toBe(true);
        expect(result.hasOwnProperty("main_url")).toBe(true);
      });
  });
});


describe("Getting seconPageData",()=>{
  test("GET - status: 200 - respond with an abject containing secondPageData", () => {
    return request(app)
      .get("/api/secondPageData")
      .expect(200)
      .then((response) => {
        const result = response.body.secondPageData[0];
        expect(typeof result).toBe("object");
        expect(result.hasOwnProperty("title")).toBe(true);
        expect(result.hasOwnProperty("content")).toBe(true);
        expect(result.hasOwnProperty("second_url")).toBe(true);
      });
  });

});

describe("Getting reviews", ()=>{
  test("",()=>{
    return request(app)
    .get("/api/reviewData")
    .expect(200)
    .then((response)=>{ 
      const result = response.body.reviews;
      result.forEach((review)=>{ 
        expect(Object.keys(review).length).toBe(4);
        expect(review.hasOwnProperty("id")).toBe(true);
        expect(review.hasOwnProperty("body")).toBe(true);
        expect(review.hasOwnProperty("name")).toBe(true);
        expect(review.hasOwnProperty("created_at")).toBe(true);
      })
    })
  })
})

