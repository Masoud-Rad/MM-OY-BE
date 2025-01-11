const e = require("cors");
const db = require("../db/connection");

exports.selectValueData = () => {
  return db.query(
    `
    SELECT * FROM value;
    `
  ).then(({ rows }) => {
    return rows;
  });
}

exports.addValueData = (newData) => {
    const { content, url } = newData;
    
    
        return db.query(
        `
            INSERT INTO value (content, url)
            VALUES ($1, $2)
            RETURNING *;
            `,
        [content, url]
        ).then(({ rows }) => {
        return rows[0];
        });
    }

exports.updateValueData = (newData) => {
    const { content, url } = newData;
    
        return db.query(
        `
            UPDATE value
            SET content = $1 , url = $2
            RETURNING *;
            `,
        [content, url]
        ).then(({ rows }) => {
        return rows[0];
        });
    }       
    