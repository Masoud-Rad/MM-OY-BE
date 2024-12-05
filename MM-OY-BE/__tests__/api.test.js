const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");

const devData = require("../db/data/test-data/index");
const { expect, describe, test } = require("@jest/globals");

beforeEach(() => seed(devData));
afterAll(() => connection.end());

//----------------------------------------GET------------------------

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

describe("Getting seconPageData", () => {
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

describe("Getting reviews", () => {
  test("", () => {
    return request(app)
      .get("/api/reviewData")
      .expect(200)
      .then((response) => {
        const result = response.body.reviews;
        result.forEach((review) => {
          expect(Object.keys(review).length).toBe(4);
          expect(review.hasOwnProperty("id")).toBe(true);
          expect(review.hasOwnProperty("body")).toBe(true);
          expect(review.hasOwnProperty("name")).toBe(true);
          expect(review.hasOwnProperty("created_at")).toBe(true);
        });
      });
  });
});

describe("Getting contactDetails", () => {
  test("GET - status: 200 - respond with an abject containing contactDetails Data", () => {
    return request(app)
      .get("/api/contactDetails")
      .expect(200)
      .then((response) => {
        const result = response.body.contactDetails[0];
        expect(typeof result).toBe("object");
        expect(result.hasOwnProperty("phone")).toBe(true);
        expect(result.hasOwnProperty("landline")).toBe(true);
        expect(result.hasOwnProperty("instagram")).toBe(true);
        expect(result.hasOwnProperty("facebook")).toBe(true);
        expect(result.hasOwnProperty("whatsapp")).toBe(true);
        expect(result.hasOwnProperty("email")).toBe(true);
      });
  });
});

//----------------------------------------Post-------------------------

describe("POST- companyDetails", () => {
  test("POST- status: 201- responds with the New Company Details", () => {
    const newCompanyDetails = {
      company_name: "MM-newName",
      logo_url: "www.New-link.com",
    };
    return request(app)
      .post("/api/companyDetails")
      .send(newCompanyDetails)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.companyDetails).length).toBe(2);
        expect(body.companyDetails.company_name).toBe("MM-newName");
        expect(body.companyDetails.logo_url).toBe("www.New-link.com");
      });
  });

  test("POST- status: 201- responds with the New Company Details", () => {
    const newCompanyDetails = {
      company_name: "MM-newName",
    };
    return request(app)
      .post("/api/companyDetails")
      .send(newCompanyDetails)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.companyDetails).length).toBe(2);
        expect(body.companyDetails.company_name).toBe("MM-newName");
        expect(body.companyDetails.logo_url).toBe(null);
      });
  });

  test("POST- status: 203- responds with Non-Authoritative Information", () => {
    const newCompanyDetails = {
      body: "this is my test_add_comment body",
      username: "Mas",
    };
    return request(app)
      .post("/api/companyDetails")
      .send(newCompanyDetails)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request!");
      });
  });
});

describe("POST mainPageData", () => {
  test("POST- status: 201- responds with Main Page's Data", () => {
    const newMainPageData = {
      title: "MainPageTitle",
      subtitle: "MainPageSubtitle",
      content:
        "Even my hjkb fkjehbwkjfbwe feoufhewhve your cherished belongings, we are there for you from pick up to delivery. You can enjoy a stress-free removal from start to finish. No job is too small or big for The Removal Man.",
      url: "www.New-link.com",
    };
    return request(app)
      .post("/api/mainPageData")
      .send(newMainPageData)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.mainPageData).length).toBe(4);
        expect(body.mainPageData.title).toBe("MainPageTitle");
        expect(body.mainPageData.subtitle).toBe("MainPageSubtitle");
        expect(body.mainPageData.hasOwnProperty("content")).toBe(true);
        expect(body.mainPageData.hasOwnProperty("main_url")).toBe(true);
      });
  });

  test("POST- status: 201- responds with Main Page's Data", () => {
    const newMainPageData = {
      title: "MainPageTitle",
      subtitle: "MainPageSubtitle",
      url: "www.New-link.com",
    };
    return request(app)
      .post("/api/mainPageData")
      .send(newMainPageData)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.mainPageData).length).toBe(4);
        expect(body.mainPageData.title).toBe("MainPageTitle");
        expect(body.mainPageData.subtitle).toBe("MainPageSubtitle");
        expect(body.mainPageData.content).toBe(null);
        expect(body.mainPageData.hasOwnProperty("content")).toBe(true);
        expect(body.mainPageData.hasOwnProperty("main_url")).toBe(true);
      });
  });
});

describe("POST secondPageData", () => {
  test("POST- status: 201- responds with Second Page's Data", () => {
    const newSecondPageData = {
      title: "Our miOur mission is to help you move home.",
      content: "Your belongings are in safe hands.",
      url: "www.New-link.com",
    };

    return request(app)
      .post("/api/secondPageData")
      .send(newSecondPageData)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.secondPageData).length).toBe(3);
        expect(body.secondPageData.second_url).toBe("www.New-link.com");
        expect(body.secondPageData.hasOwnProperty("title")).toBe(true);
        expect(body.secondPageData.hasOwnProperty("content")).toBe(true);
      });
  });
  test("POST- status: 201- responds with Second Page's Data", () => {
    const newSecondPageData = {
      title: "Our miOur mission is to help you move home.",
      url: "www.New-link.com",
    };

    return request(app)
      .post("/api/secondPageData")
      .send(newSecondPageData)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.secondPageData).length).toBe(3);
        expect(body.secondPageData.second_url).toBe("www.New-link.com");
        expect(body.secondPageData.content).toBe(null);
        expect(body.secondPageData.hasOwnProperty("title")).toBe(true);
        expect(body.secondPageData.hasOwnProperty("content")).toBe(true);
        expect(body.secondPageData.hasOwnProperty("second_url")).toBe(true);
      });
  });
});

describe("POST reviewData", () => {
  test("POST- status: 201- responds with review's Data", () => {
    const newReviewData = {
      body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
      name: "grumpy19",
    };

    return request(app)
      .post("/api/reviewData")
      .send(newReviewData)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.reviewData).length).toBe(4);
        expect(body.reviewData.name).toBe("grumpy19");
        expect(body.reviewData.hasOwnProperty("name")).toBe(true);
        expect(body.reviewData.hasOwnProperty("id")).toBe(true);
        expect(body.reviewData.hasOwnProperty("body")).toBe(true);
        expect(body.reviewData.hasOwnProperty("created_at")).toBe(true);
      });
  });
});

describe("POST contactDetails", () => {
  test("POST- status: 201- responds with contact Details", () => {
    const newContactDetails = {
      phone: "00350000000000",
      email: "mm_oy@gmail.com",
    };

    return request(app)
      .post("/api/contactDetails")
      .send(newContactDetails)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.contactDetails).length).toBe(6);
        expect(body.contactDetails.phone).toBe("00350000000000");
        expect(body.contactDetails.email).toBe("mm_oy@gmail.com");
        expect(body.contactDetails.hasOwnProperty("phone")).toBe(true);
        expect(body.contactDetails.hasOwnProperty("email")).toBe(true);
      });
  });
  test("POST- status: 201- responds with contact Details", () => {
    const newContactDetails = {
      phone: "00350000000000",
      email: "mm_oy@gmail.com",
      instagram: "ins",
    };

    return request(app)
      .post("/api/contactDetails")
      .send(newContactDetails)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.contactDetails).length).toBe(6);
        expect(body.contactDetails.phone).toBe("00350000000000");
        expect(body.contactDetails.email).toBe("mm_oy@gmail.com");
        expect(body.contactDetails.instagram).toBe("ins");
        expect(body.contactDetails.landline).toBe(null);
        expect(body.contactDetails.facebook).toBe(null);
        expect(body.contactDetails.whatsapp).toBe(null);
        expect(body.contactDetails.hasOwnProperty("phone")).toBe(true);
        expect(body.contactDetails.hasOwnProperty("email")).toBe(true);
        expect(body.contactDetails.hasOwnProperty("instagram")).toBe(true);
        expect(body.contactDetails.hasOwnProperty("facebook")).toBe(true);
        expect(body.contactDetails.hasOwnProperty("whatsapp")).toBe(true);
        expect(body.contactDetails.hasOwnProperty("landline")).toBe(true);
      });
  });
});

describe("PATCH-CompanyDetails", () => {
  test("PATCH - status: 200 - responds with the updated CompanyDetails", () => {
    const newCompanyDetails = {
      company_name: "MM-newName",
      logo_url: "www.new-url.com",
    };
    return request(app)
      .patch("/api/companyDetails")
      .send(newCompanyDetails)
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedCompanyDetails.company_name).toBe("MM-newName");
        expect(body.updatedCompanyDetails.logo_url).toBe("www.new-url.com");
      });
  });

  test("PATCH - status: 200 - responds with the updated CompanyDetails", () => {
    const newCompanyDetails = {
      logo_url: "www.new-url.com",
    };
    return request(app)
      .patch("/api/companyDetails")
      .send(newCompanyDetails)
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedCompanyDetails.company_name).toBe("MM-onkeydown");
        expect(body.updatedCompanyDetails.logo_url).toBe("www.new-url.com");
      });
  });
});

describe("DELETE Logo and Company Name", () => {
  test("DELETE -states: 204 , respond with no content", () => {
    return request(app)
      .delete("/api/companyDetails")
      .expect(204)
      .then((res) => {
        expect(typeof res).toBe("object");
      });
  });
});
