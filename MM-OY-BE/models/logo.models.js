const db = require('../db/connection');


exports.selectCompanyDetails= ()=>{

    return db.query(`
    SELECT * FROM logo;
    `).then(({rows})=>{return rows;} )

}


exports.addCompanyDetails = (newDetails ) => {
    if (typeof newDetails === 'object' && newDetails.hasOwnProperty("company_name") && newDetails.hasOwnProperty("logo_url")) {
         const name= newDetails.company_name;
         const url= newDetails.logo_url;
        
        return db.query(`INSERT INTO logo
    (company_name, logo_url) VALUES ($1,$2) RETURNING *;`
            , [name, url]).then((result) => { 
              return result.rows[0]
            })      
    }
    else {
        return Promise.reject({ status: 400, msg: "bad request!" })
    }
};