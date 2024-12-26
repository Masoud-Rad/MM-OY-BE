const db = require("../db/connection");

exports.selectMainPageData = () => {
  return db
    .query(
      `
    SELECT * FROM mainpage;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addMainPageData = (newData) => {
  const { title, subtitle, content, url } = newData;

  // Create arrays to dynamically build the query
  const fields = [];
  const values = [];
  const placeholders = [];

  if (title) {
    fields.push("title");
    values.push(title);
    placeholders.push(`$${values.length}`);
  }

  if (subtitle) {
    fields.push("subtitle");
    values.push(subtitle);
    placeholders.push(`$${values.length}`);
  }

  if (content) {
    fields.push("content");
    values.push(content);
    placeholders.push(`$${values.length}`);
  }

  if (url) {
    fields.push("main_url");
    values.push(url);
    placeholders.push(`$${values.length}`);
  }

  // If no valid fields are provided, reject the request
  if (fields.length === 0) {
    return Promise.reject({ status: 400, msg: "bad request!" });
  }

  // Build the final query
  const query = `
      INSERT INTO mainpage (${fields.join(", ")}) 
      VALUES (${placeholders.join(", ")})
      RETURNING *;
    `;

  // Execute the query with the collected values
  return db.query(query, values).then((result) => {
    return result.rows[0];
  });
};


exports.updateMainPageData = (update) => {
  const { title, subtitle, content, main_url } = update;

  // If no valid fields are provided, reject the request
  if (!title && !subtitle && !content && !main_url) {
    return Promise.reject({ status: 400, msg: "bad request!" });
  }

  // Build the final query
  const query = `
      UPDATE mainpage
      SET title=$1, subtitle=$2, content=$3, main_url=$4
      RETURNING *;
    `;

  // Execute the query with the collected values
  return db.query(query, [title, subtitle, content, main_url]).then(({ rows }) => {
    return rows[0];
  });
};