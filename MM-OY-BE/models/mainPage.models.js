const db = require('../db/connection');


exports.selectMainPageData= ()=>{

    return db.query(`
    SELECT * FROM mainpage;
    `).then(({rows})=>{return rows;} )

}