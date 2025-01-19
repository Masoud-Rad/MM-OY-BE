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
    const { content, url, description } = newData;
    
    
        return db.query(
        `
            INSERT INTO value (content, url, description )
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
        [content, url, description]
        ).then(({ rows }) => {
        return rows[0];
        });
    }

exports.updateValueData = (newData) => {
    const { content, url, description } = newData;
    
        return db.query(
        `
            UPDATE value
            SET content = $1 , url = $2, description = $3
            RETURNING *;
            `,
        [content, url, description]
        ).then(({ rows }) => {
        return rows[0];
        });
    }       
    