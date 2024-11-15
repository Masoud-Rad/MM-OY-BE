const db = require('../db/connection');


exports.selectContactDetails= ()=>{

    return db.query(`
    SELECT * FROM contact;
    `).then(({rows})=>{return rows;} )

}








