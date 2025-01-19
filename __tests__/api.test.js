const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");

const devData = require("../db/data/test-data/index");
const { expect, describe, test } = require("@jest/globals");
const e = require("cors");

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
        expect(result.hasOwnProperty("title1")).toBe(true);
        expect(result.hasOwnProperty("title2")).toBe(true);
        expect(result.hasOwnProperty("subtitle")).toBe(true);
        expect(result.hasOwnProperty("content")).toBe(true);
        expect(result.hasOwnProperty("main_url")).toBe(true);
        expect(result.hasOwnProperty("second_url")).toBe(true);
      });
  });
});

describe("Getting about the company's data", () => {
  test("GET - status: 200 - respond with the content of about the company", () => {
    return request(app)
      .get("/api/about")
      .expect(200)
      .then((response) => {
        const result = response.body.about[0];
        expect(typeof result).toBe("object");
        expect(result.hasOwnProperty("content")).toBe(true);
        expect(result.hasOwnProperty("url1")).toBe(true);
        expect(result.hasOwnProperty("url2")).toBe(true);
      });
  });
});

describe("Getting company's values", () => {
  test("GET - status: 200 - respond with the content of valus", () => {
    return request(app)
      .get("/api/value")
      .expect(200)
      .then((response) => { 
        const result = response.body.value[0];
        expect(typeof result).toBe("object");
        expect(result.hasOwnProperty("content")).toBe(true);
        expect(result.hasOwnProperty("url")).toBe(true);
        expect(result.hasOwnProperty("description")).toBe(true);
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

describe("POST- about the company", () => {
  test("POST- status: 201- responds with the New about content", () => {
    const newAboutInfo = {
      content: "about the company",
      url1: "www.New-link1.com",
      url2: "www.New-link2.com",
    };
    return request(app)
      .post("/api/about")
      .send(newAboutInfo)
      .expect(201)
      .then(({ body }) => { 
        expect(Object.keys(body.about).length).toBe(3);
        expect(body.about.content).toBe("about the company");
        expect(body.about.url1).toBe("www.New-link1.com");
        expect(body.about.url2).toBe("www.New-link2.com");
      });
  });
});

describe("POST mainPageData", () => {
  test("POST- status: 201- responds with Main Page's Data", () => {
    const newMainPageData = {
      title1: "MainPageTitle",
      title2: "MainPageTitle2",
      subtitle: "MainPageSubtitle",
      content:
        "Even my hjkb fkjehbwkjfbwe feoufhewhve your cherished belongings, we are there for you from pick up to delivery. You can enjoy a stress-free removal from start to finish. No job is too small or big for The Removal Man.",
      main_url: "www.New-link1.com",
      second_url: "www.New-link2.com",
    };
    return request(app)
      .post("/api/mainPageData")
      .send(newMainPageData)
      .expect(201)
      .then(({ body }) => { 
        expect(Object.keys(body.mainPageData).length).toBe(6);
        expect(body.mainPageData.title1).toBe("MainPageTitle");
        expect(body.mainPageData.title2).toBe("MainPageTitle2");
        expect(body.mainPageData.subtitle).toBe("MainPageSubtitle");
        expect(body.mainPageData.hasOwnProperty("content")).toBe(true);
        expect(body.mainPageData.hasOwnProperty("main_url")).toBe(true);
        expect(body.mainPageData.hasOwnProperty("second_url")).toBe(true);
      });
  });

  test("POST- status: 201- responds with Main Page's Data", () => {
    const newMainPageData = {
      title1: "MainPageTitle",
      subtitle: "MainPageSubtitle",
      main_url: "www.New-link.com",
    };
    return request(app)
      .post("/api/mainPageData")
      .send(newMainPageData)
      .expect(201)
      .then(({ body }) => {
        expect(Object.keys(body.mainPageData).length).toBe(6);
        expect(body.mainPageData.title1).toBe("MainPageTitle");
        expect(body.mainPageData.subtitle).toBe("MainPageSubtitle");
        expect(body.mainPageData.content).toBe(null);
        expect(body.mainPageData.hasOwnProperty("content")).toBe(true);
        expect(body.mainPageData.hasOwnProperty("main_url")).toBe(true);
        expect(body.mainPageData.hasOwnProperty("title2")).toBe(true);
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

describe("POST- company's values", () => {
  test("POST- status: 201- responds with the New company's values", () => {
    const newValuesInfo = {
      content: "value the company",
      url: "www.New-link.com",
      description: "value the company"
    };
    return request(app)
      .post("/api/value")
      .send(newValuesInfo)
      .expect(201)
      .then(({ body }) => { 
        expect(Object.keys(body.value).length).toBe(3);
        expect(body.value.content).toBe("value the company");
        expect(body.value.url).toBe("www.New-link.com");
        expect(body.value.description).toBe("value the company");
        expect(body.value.hasOwnProperty("content")).toBe(true);
        expect(body.value.hasOwnProperty("url")).toBe(true);
        expect(body.value.hasOwnProperty("description")).toBe(true);
      });
  });
});
//----------------------------------------Patch-------------------------

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

describe("PATCH-mainPageData", () => {
  test("PATCH - status: 200 - responds with the updated mainPageData", () => {
    const newMainPageData = {
      title1: "Our miOur mission is to help you move home.",
      subtitle: "Any New Text.",
      content:
        "When it comes to helping you move your cherished belongings, we are there for you from pick up to delivery. You can enjoy a stress-free removal from start to finish. No job is too small or big for The Removal Man.",
      main_url: "www.new-url.com",
    };
    return request(app)
      .patch("/api/mainPageData")
      .send(newMainPageData)
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedMainPageData.title1).toBe(
          "Our miOur mission is to help you move home."
        );
        expect(body.updatedMainPageData.subtitle).toBe("Any New Text.");
        expect(body.updatedMainPageData.main_url).toBe("www.new-url.com");
      });
  });
});

describe("PATCH-secondPageData", () => {
  test("PATCH - status: 200 - responds with the updated secondPageData", () => {
    const newSecondPageData = {
      title: "Our miOur mission is to help you move home.",
      content: "new content",
      second_url: "www.new-url.com",
    };
    return request(app)
      .patch("/api/secondPageData")
      .send(newSecondPageData)
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedSecondPageData.title).toBe(
          "Our miOur mission is to help you move home."
        );
        expect(body.updatedSecondPageData.content).toBe("new content");
        expect(body.updatedSecondPageData.second_url).toBe("www.new-url.com");
      });
  });
});

describe("PATCH-about the company", () => {
  test("PATCH - status: 200 - responds with the updated information", () => {
    const newAboutData = {
      content: "new content",
    };
    return request(app)
      .patch("/api/about")
      .send(newAboutData)
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedAboutData.content).toBe("new content");
      });
  });
});

describe("PATCH-ContactDetails", () => {
  test("PATCH - status: 200 - responds with the updated ContactDetails", () => {
    const newContactDetails = {
      phone: "1111111111",
      landline: "0000000000",
      instagram: "newInsta",
      facebook: "FFFF",
      whatsapp: "NewWhatsapp",
      email: "mm_oy@gmail.com",
    };
    return request(app)
      .patch("/api/contactDetails")
      .send(newContactDetails)
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedContactDetails.phone).toBe("1111111111");
        expect(body.updatedContactDetails.landline).toBe("0000000000");
        expect(body.updatedContactDetails.instagram).toBe("newInsta");
        expect(body.updatedContactDetails.facebook).toBe("FFFF");
        expect(body.updatedContactDetails.whatsapp).toBe("NewWhatsapp");
        expect(body.updatedContactDetails.email).toBe("mm_oy@gmail.com");
      });
  });
});

describe("PATCH- Values", () => {
  test("PATCH - status: 200 - responds with the updated values", () => {
    const newValuesData = {
      content: "new content",
    };
    return request(app)
      .patch("/api/value")
      .send(newValuesData)
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedValueData.content).toBe("new content");
      });
  });
});
//----------------------------------------Delete-------------------------

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
