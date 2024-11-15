const db = require('../db/connection')

exports.selectReviewData= ()=>{
    return db.query(`
        SELECT * FROM review;
        `)
        .then(({rows})=>{return rows;})
}