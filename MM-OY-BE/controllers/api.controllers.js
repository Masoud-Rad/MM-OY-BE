const {selectCompanyDetails} = require('../models/logo.models')
const {selectMainPageData} = require('../models/mainPage.models')

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

