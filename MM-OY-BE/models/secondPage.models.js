const db = require('../db/connection');


exports.selectSecondPageData= ()=>{

    return db.query(`
    SELECT * FROM secondpage;
    `).then(({rows})=>{ return rows;} )

}