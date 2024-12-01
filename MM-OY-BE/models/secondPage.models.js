const db = require("../db/connection");

exports.selectSecondPageData = () => {
  return db
    .query(
      `
    SELECT * FROM secondpage;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addSecondPageData = (newData) => {
  const { title, content, url } = newData;

  const fields = [];
  const values = [];
  const placeholders = [];

  if (title) {
    fields.push("title");
    values.push(title);
    placeholders.push(`$${values.length}`);
  }

  if (content) {
    fields.push("content");
    values.push(content);
    placeholders.push(`$${values.length}`);
  }

  if (url) {
    fields.push("second_url");
    values.push(url);
    placeholders.push(`$${values.length}`);
  }

  if (fields.length === 0) {
    return Promise.reject({ status: 400, msg: "bad request!" });
  }

  const query = `
      INSERT INTO secondpage (${fields.join(", ")}) 
      VALUES (${placeholders.join(", ")})
      RETURNING *;
    `;

  return db.query(query, values).then((result) => { 
    return result.rows[0];
  });
};
