const {selectCompanyDetails} = require('../models/logo.models')


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