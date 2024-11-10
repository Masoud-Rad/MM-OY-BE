const db = require('../db/connection');


exports.selectCompanyDetails= ()=>{

    return db.query(`
    SELECT * FROM logo;
    `).then(({rows})=>{return rows;} )

}