const db = require('../db/connection')

exports.selectReviewData= ()=>{
    return db.query(`
        SELECT * FROM review;
        `)
        .then(({rows})=>{return rows;})
}


exports.addReviewData = (newData) => {
    const { body, name } = newData;
  
    const fields = [];
    const values = [];
    const placeholders = [];
  
    if (body) {
      fields.push("body");
      values.push(body);
      placeholders.push(`$${values.length}`);
    }
  
    if (name) {
      fields.push("name");
      values.push(name);
      placeholders.push(`$${values.length}`);
    }
  
  
    if (fields.length === 0) {
      return Promise.reject({ status: 400, msg: "bad request!" });
    }
  
    const query = `
        INSERT INTO review (${fields.join(", ")}) 
        VALUES (${placeholders.join(", ")})
        RETURNING *;
      `;
  
    return db.query(query, values).then((result) => { 
      return result.rows[0];
    });
  };
  