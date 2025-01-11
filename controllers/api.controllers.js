const {
  selectCompanyDetails,
  addCompanyDetails,
  updateCompanyDetails,
  removeCompanyDetails,
} = require("../models/logo.models");
const {
  selectMainPageData,
  addMainPageData,
  updateMainPageData,
} = require("../models/mainPage.models");
const {
  selectSecondPageData,
  addSecondPageData,
  updateSecondPageData,
} = require("../models/secondPage.models");
const { selectReviewData, addReviewData } = require("../models/reviews.models");
const {
  selectContactDetails,
  addContactDetails,
  updateContactDetails,
} = require("../models/contactDetails.models");

const {
  selectAboutData,
  addAboutData,
  updateAboutData,
} = require("../models/about.models");

const {
  selectValueData,
  addValueData,
  updateValueData,
} = require("../models/values.models");
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

exports.getAboutData = (req, res, next) => {
  selectAboutData()
    .then((data) => {
      res.status(200).send({ about: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getValueData = (req, res, next) => {
  selectValueData()
    .then((data) => {
      res.status(200).send({ value: data });
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

exports.postContactDetails = (req, res, next) => {
  const newContactDetails = req.body;
  addContactDetails(newContactDetails)
    .then((data) => {
      res.status(201).send({ contactDetails: data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postAboutData = (req, res, next) => {
  const newAboutData = req.body;
  addAboutData(newAboutData)
    .then((data) => {
      res.status(201).send({ about: data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postValueData = (req, res, next) => {
  const newValueData = req.body;
  addValueData(newValueData)
    .then((data) => {
      res.status(201).send({ value: data });
    })
    .catch((error) => {
      next(error);
    });
};

//----------------------------------------------Patch-------------------------------------------------

exports.patchCompanyDetails = (req, res, next) => {
  const update = req.body;
  updateCompanyDetails(update)
    .then((updatedCompanyDetails) => {
      res.status(202).send({ updatedCompanyDetails });
    })
    .catch((error) => {
      next(error);
    });
};

exports.patchMainPageData = (req, res, next) => {
  const update = req.body;
  updateMainPageData(update)
    .then((updatedMainPageData) => {
      res.status(202).send({ updatedMainPageData });
    })
    .catch((error) => {
      next(error);
    });
};

exports.patchSecondPageData = (req, res, next) => {
  const update = req.body;
  updateSecondPageData(update)
    .then((updatedSecondPageData) => {
      res.status(202).send({ updatedSecondPageData });
    })
    .catch((error) => {
      next(error);
    });
};

exports.patchContactDetails = (req, res, next) => {
  const update = req.body;
  updateContactDetails(update)
    .then((updatedContactDetails) => {
      res.status(202).send({ updatedContactDetails });
    })
    .catch((error) => {
      next(error);
    });
};

exports.patchAboutData = (req, res, next) => {
  const update = req.body;
  updateAboutData(update)
    .then((updatedAboutData) => {
      res.status(202).send({ updatedAboutData });
    })
    .catch((error) => {
      next(error);
    });
};

exports.patchValueData = (req, res, next) => {
  const update = req.body;
  updateValueData(update)
    .then((updatedValueData) => {
      res.status(202).send({ updatedValueData });
    })
    .catch((error) => {
      next(error);
    });
};
//----------------------------------------------Delete------------------------------------------------

exports.deleteCompanyDetails = (req, res, next) => {
  removeCompanyDetails()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      next(error);
    });
};
