const db= require('../db/connection');

exports.selectAboutData= ()=>{
    return db.query(`
    SELECT * FROM about;
    `).then(({rows})=>{ return rows;} )
}

exports.addAboutData= (newData) => {
    const {content} = newData;

    if (!content) {
        return Promise.reject({ status: 400, msg: "bad request!" });
      } else {
        return db.query(
          `
          INSERT INTO about (content)
          VALUES ($1)
          RETURNING *;
          `,
          [content]
        ).then(({ rows }) => {
          return rows[0];
        });
      } 
}

exports.updateAboutData= (newData) => {
    const {content} = newData;

    if (!content) {
        return Promise.reject({ status: 400, msg: "bad request!" });
      } else {
        return db.query(
          `
          UPDATE about
          SET content = $1
          RETURNING *;
          `,
          [content]
        ).then(({ rows }) => {
          return rows[0];
        });
      } 
}