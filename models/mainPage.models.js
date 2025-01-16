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
  const { title1, title2, subtitle, content, main_url, second_url } = newData;

  // Create arrays to dynamically build the query
  const fields = [];
  const values = [];
  const placeholders = [];

  if (title1) {
    fields.push("title1");
    values.push(title1);
    placeholders.push(`$${values.length}`);
  }

  if (title2) {
    fields.push("title2");
    values.push(title2);
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

  if (main_url) {
    fields.push("main_url");
    values.push(main_url);
    placeholders.push(`$${values.length}`);
  }

  if (second_url) {
    fields.push("second_url");
    values.push(second_url);
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
  const { title1, title2, subtitle, content, main_url, second_url } = update;

 

  // Build the final query
  const query = `
      UPDATE mainpage
      SET title1=$1, title2=$2, subtitle=$3, content=$4, main_url=$5, second_url=$6
      RETURNING *;
    `;

  // Execute the query with the collected values
  return db.query(query, [title1, title2, subtitle, content, main_url, second_url]).then(({ rows }) => { 
    return rows[0];
  });
};