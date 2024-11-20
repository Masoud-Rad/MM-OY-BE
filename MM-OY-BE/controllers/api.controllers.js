const {selectCompanyDetails, addCompanyDetails} = require('../models/logo.models')
const {selectMainPageData} = require('../models/mainPage.models')
const {selectSecondPageData} = require('../models/secondPage.models')
const {selectReviewData} = require('../models/reviews.models')
const {selectContactDetails} = require('../models/contactDetails.models')
//-------------------------Get---------------------------------------------------------    

exports.getCompanyDetails = (req, res, next)=>{
    selectCompanyDetails()
    .then((data)=>{
        res.status(200).send({companyDetails: data})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getMainPageData = (req, res, next)=>{
    selectMainPageData()
    .then((data)=>{
        res.status(200).send({mainPageData: data})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getSecondPageData = (req, res, next)=>{
    selectSecondPageData()
    .then((data)=>{ 
        res.status(200).send({secondPageData: data})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getReviewData = (req, res, next)=>{
    selectReviewData()
    .then((data)=>{ 
        res.status(200).send({reviews: data})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getContactDetails = (req, res, next)=>{
    selectContactDetails()
    .then((data)=>{ 
        res.status(200).send({contactDetails: data})
    })
    .catch((err)=>{
        next(err)
    })
}

//----------------------------Post-----------------------------------

exports.postCompanyDetails=(req,res,next)=>{
    const newCompanyDetails= req.body;
    addCompanyDetails(newCompanyDetails).then((data)=>{
        res.status(201).send({ 'companyDetails': data })
    }) 
    .catch((error) => {
        next(error)
    })
}

