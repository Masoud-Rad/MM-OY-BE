const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());

const {
  getCompanyDetails,
  getMainPageData,
  getSecondPageData,
  getReviewData,
  getContactDetails,
  getAboutData,
  postCompanyDetails,
  postMainPageData,
  postSecondPageData,
  postReviewData,
  postContactDetails,
  postAboutData,
  patchCompanyDetails,
  patchMainPageData,
  patchSecondPageData,
  patchContactDetails,
  patchAboutData,
  deleteCompanyDetails,
} = require("./controllers/api.controllers");

app.use(cors());

//---------------------------GET------------------------------
app.get("/api/companyDetails", getCompanyDetails);
app.get("/api/mainPageData", getMainPageData);
app.get("/api/secondPageData", getSecondPageData);
app.get("/api/reviewData", getReviewData);
app.get("/api/contactDetails", getContactDetails);
app.get("/api/about", getAboutData);

//----------------------------------------------Post-------------------------------------------------

app.post("/api/companyDetails", postCompanyDetails);
app.post("/api/mainPageData", postMainPageData);
app.post("/api/secondPageData", postSecondPageData);
app.post("/api/reviewData", postReviewData);
app.post("/api/contactDetails", postContactDetails);
app.post("/api/about", postAboutData);

//----------------------------------------------Patch-------------------------------------------------

app.patch("/api/companyDetails", patchCompanyDetails);
app.patch("/api/mainPageData", patchMainPageData);
app.patch("/api/secondPageData", patchSecondPageData);
app.patch("/api/contactDetails", patchContactDetails);
app.patch("/api/about", patchAboutData);
//----------------------------------------------Delete------------------------------------------------

app.delete("/api/companyDetails", deleteCompanyDetails);

//----------------------------------------------Error handeling---------------------------------------

app.use((error, req, res, next) => {
  if (error.code === "22P02") {
    res.status(404).send({ msg: "Not Found!" });
  } else {
    next(error);
  }
});
app.use((error, req, res, next) => {
  if (error.code === "23503") {
    res.status(203).send({ msg: "Non-Authoritative Information" });
  } else {
    next(error);
  }
});

app.use((error, req, res, next) => {
  res.status(error.status).send({ msg: error.msg });
});

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found!" });
});

app.use((error, req, res, next) => {
  res.status(500).send({ msg: "Server Error!" });
});
module.exports = app;
