const db = require("../db/connection");

exports.selectAboutData = () => {
  return db
    .query(
      `
    SELECT * FROM about;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addAboutData = (newData) => {
  const { content, url1, url2 } = newData;

  if (!content) {
    return Promise.reject({ status: 400, msg: "bad request!" });
  } else {
    return db
      .query(
        `
          INSERT INTO about (content, url1, url2)
          VALUES ($1, $2, $3)
          RETURNING *;
          `,
        [content, url1, url2]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }
};

exports.updateAboutData = (newData) => {
  const { content, url1, url2 } = newData;

  if (!content) {
    return Promise.reject({ status: 400, msg: "bad request!" });
  } else {
    return db
      .query(
        `
          UPDATE about
          SET content = $1 , url1 = $2, url2 = $3
          RETURNING *;
          `,
        [content, url1, url2]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }
};
