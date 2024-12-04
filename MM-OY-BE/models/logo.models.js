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





exports.removeCompanyDetails = ()=>{
    return db.query(`DELETE FROM logo`)
}
