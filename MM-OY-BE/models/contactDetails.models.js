const db = require('../db/connection');


exports.selectContactDetails= ()=>{

    return db.query(`
    SELECT * FROM contact;
    `).then(({rows})=>{return rows;} )

}



exports.addContactDetails= (newData) => {
    const { phone, landline, instagram, facebook, whatsapp, email } = newData;
  
    const fields = [];
    const values = [];
    const placeholders = [];
  
    if (phone) {
      fields.push("phone");
      values.push(phone);
      placeholders.push(`$${values.length}`);
    }
  
    if (landline) {
      fields.push("landline");
      values.push(landline);
      placeholders.push(`$${values.length}`);
    }

    if (instagram) {
        fields.push("instagram");
        values.push(instagram);
        placeholders.push(`$${values.length}`);
      }

      if (facebook) {
        fields.push("facebook");
        values.push(facebook);
        placeholders.push(`$${values.length}`);
      }

      if (whatsapp) {
        fields.push("whatsapp");
        values.push(whatsapp);
        placeholders.push(`$${values.length}`);
      }

      if (email) {
        fields.push("email");
        values.push(email);
        placeholders.push(`$${values.length}`);
      }
  
    
  
    if (fields.length === 0) {
      return Promise.reject({ status: 400, msg: "bad request!" });
    }
  
    const query = `
        INSERT INTO contact (${fields.join(", ")}) 
        VALUES (${placeholders.join(", ")})
        RETURNING *;
      `;
  
    return db.query(query, values).then((result) => { 
      return result.rows[0];
    });
  };




