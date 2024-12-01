const db = require('../db/connection')

exports.selectReviewData= ()=>{
    return db.query(`
        SELECT * FROM review;
        `)
        .then(({rows})=>{return rows;})
}


exports.addReviewData = (newData) => {
    const {name, body} = newData;
  
    return db.query(`INSERT INTO review (name, body)
        VALUES ($1, $2)
        RETURNING *;
        `, [name,body]).then((result) => { 
      return result.rows[0];
    });
  };
  