const db = require("../db/connection");

exports.selectCompanyDetails = () => {
  return db
    .query(
      `
    SELECT * FROM logo;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addCompanyDetails = (newDetails) => {
  const company_name = newDetails.company_name;
  const logo_url = newDetails.logo_url;

  const fields = [];
  const values = [];
  const placeholders = [];

  if (company_name) {
    fields.push("company_name");
    values.push(company_name);
    placeholders.push(`$${values.length}`);
  }

  if (logo_url) {
    fields.push("logo_url");
    values.push(logo_url);
    placeholders.push(`$${values.length}`);
  }

  if (fields.length === 0) {
    return Promise.reject({ status: 400, msg: "bad request!" });
  }

  return db
    .query(
      `INSERT INTO logo
    (${fields.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *;`,
      values
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateCompanyDetails = (update) => {
  const { company_name, logo_url } = update;
  if (company_name && logo_url) {
    return db
      .query(
        `
        UPDATE logo
        SET company_name=$1, logo_url=$2
        RETURNING *;`,
        [company_name, logo_url]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }
  if (company_name) {
    return db
      .query(
        `
        UPDATE logo
        SET company_name=$1 
        RETURNING *;`,
        [company_name]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }

  if (logo_url) {
    return db
      .query(
        `
        UPDATE logo
        SET logo_url=$1
        RETURNING *;`,
        [logo_url]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }

  // const fields = [];
  // const values = [];
  // let query = "UPDATE logo SET ";

  // if (company_name) {
  //     fields.push("company_name");
  //     values.push(company_name);
  // }

  // if (logo_url) {
  //     fields.push("logo_url");
  //     values.push(logo_url);
  // }

  // if (fields.length === 0) {
  //     return Promise.reject({ status: 400, msg: "Bad request: no valid fields provided" });
  // }

  // // Generate dynamic query
  // query += fields.map((field, index) => `${field}=$${index + 1}`).join(", ");
  // query += " RETURNING *;";

  // return db.query(query, values).then(({ rows }) => rows[0]);
};

exports.removeCompanyDetails = () => {
  return db.query(`DELETE FROM logo`);
};
