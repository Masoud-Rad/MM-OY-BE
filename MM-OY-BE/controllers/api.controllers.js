const {
  selectCompanyDetails,
  addCompanyDetails,
} = require("../models/logo.models");
const {
  selectMainPageData,
  addMainPageData,
} = require("../models/mainPage.models");
const {
  selectSecondPageData,
  addSecondPageData,
} = require("../models/secondPage.models");
const { selectReviewData, addReviewData } = require("../models/reviews.models");
const { selectContactDetails, addContactDetails } = require("../models/contactDetails.models");
//-------------------------Get---------------------------------------------------------

exports.getCompanyDetails = (req, res, next) => {
  selectCompanyDetails()
    .then((data) => {
      res.status(200).send({ companyDetails: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getMainPageData = (req, res, next) => {
  selectMainPageData()
    .then((data) => {
      res.status(200).send({ mainPageData: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSecondPageData = (req, res, next) => {
  selectSecondPageData()
    .then((data) => {
      res.status(200).send({ secondPageData: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewData = (req, res, next) => {
  selectReviewData()
    .then((data) => {
      res.status(200).send({ reviews: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getContactDetails = (req, res, next) => {
  selectContactDetails()
    .then((data) => {
      res.status(200).send({ contactDetails: data });
    })
    .catch((err) => {
      next(err);
    });
};

//----------------------------Post-----------------------------------

exports.postCompanyDetails = (req, res, next) => {
  const newCompanyDetails = req.body;
  addCompanyDetails(newCompanyDetails)
    .then((data) => {
      res.status(201).send({ companyDetails: data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postMainPageData = (req, res, next) => {
  const newMainPageData = req.body;
  addMainPageData(newMainPageData)
    .then((data) => {
      res.status(201).send({ mainPageData: data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postSecondPageData = (req, res, next) => {
  const newSecondPagedata = req.body;
  addSecondPageData(newSecondPagedata)
    .then((data) => { 
      res.status(201).send({ secondPageData: data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postReviewData = (req, res, next) => {
    const newReviewData = req.body;
    addReviewData(newReviewData)
      .then((data) => { 
        res.status(201).send({ reviewData: data });
      })
      .catch((error) => {
        next(error);
      });
  };

  exports.postContactDetails= (req, res, next) => {
    const newContactDetails = req.body;
    addContactDetails(newContactDetails)
      .then((data) => { 
        res.status(201).send({ contactDetails: data });
      })
      .catch((error) => {
        next(error);
      });
  };
