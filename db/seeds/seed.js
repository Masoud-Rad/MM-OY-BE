const format = require("pg-format");
const db = require("../connection");

const seed = ({
  logo,
  mainPage,
  secondPage,
  review,
  contactDetails,
  about,
  values
}) => {
  return db
    .query(`DROP TABLE IF EXISTS contact;`)
    .then(() => db.query(`DROP TABLE IF EXISTS about;`))
    .then(() => db.query(`DROP TABLE IF EXISTS review;`))
    .then(() => db.query(`DROP TABLE IF EXISTS secondpage;`))
    .then(() => db.query(`DROP TABLE IF EXISTS mainpage;`))
    .then(() => db.query(`DROP TABLE IF EXISTS logo;`))
    .then(() => db.query(`DROP TABLE IF EXISTS value;`))
    .then(() => {
      return db.query(`
                CREATE TABLE logo (
                    company_name VARCHAR,
                    logo_url VARCHAR
                );
            `);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE mainpage (
                    title1 VARCHAR, 
                    title2 VARCHAR,
                    subtitle VARCHAR,
                    content VARCHAR,
                    main_url VARCHAR,
                    second_url VARCHAR
                );
            `);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE secondpage (
                    title VARCHAR,
                    content VARCHAR,
                    second_url VARCHAR
                );
            `);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE review (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR,
                    body VARCHAR,
                    created_at TIMESTAMP DEFAULT NOW()
                );
            `);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE contact (
                    phone VARCHAR,
                    landline VARCHAR,
                    instagram VARCHAR,
                    facebook VARCHAR,
                    whatsapp VARCHAR,
                    email VARCHAR
                ); 
            `);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE about (  
                    content VARCHAR,
                    url1 VARCHAR,
                    url2 VARCHAR
                );
            `);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE value (
                    content VARCHAR,
                    url VARCHAR
                );
            `);
    })
    .then(() => {
      const insertLogoAndNameQuery = format(
        `
                INSERT INTO logo (company_name, logo_url) 
                VALUES (%L, %L)`,
        logo[0].company_name,
        logo[0].logo_url
      );

      return db.query(insertLogoAndNameQuery);
    })
    .then(() => {
      const insertMainpageQuery = format(
        `
                INSERT INTO mainpage (title1, title2, subtitle, content, main_url, second_url) 
                VALUES (%L, %L, %L, %L, %L, %L)`,
        mainPage[0].title1,
        mainPage[0].title2,
        mainPage[0].subtitle,
        mainPage[0].content,
        mainPage[0].main_url,
        mainPage[0].second_url
      );

      return db.query(insertMainpageQuery);
    })
    .then(() => {
      const insertSecondpageQuery = format(
        `
                INSERT INTO secondpage (title, content, second_url) 
                VALUES (%L, %L, %L)`,
        secondPage[0].title,
        secondPage[0].content,
        secondPage[0].second_url
      );

      return db.query(insertSecondpageQuery);
    })
    .then(() => {
      const reviewsData = review.map(({ name, body, created_at }) => [
        name,
        body,
        created_at,
      ]);

      const insertReviewQuery = format(
        `
          INSERT INTO review (name, body, created_at) 
          VALUES %L`,
        reviewsData
      );

      return db.query(insertReviewQuery);
    })
    .then(() => {
      const insertContactDetailsQuery = format(
        `
                INSERT INTO contact (phone, landline, instagram, facebook, whatsapp, email)
                VALUES (%L, %L, %L, %L, %L, %L)`,
        contactDetails[0].phone,
        contactDetails[0].landline,
        contactDetails[0].instagram,
        contactDetails[0].facebook,
        contactDetails[0].whatsapp,
        contactDetails[0].email
      );

      return db.query(insertContactDetailsQuery); // Added missing return
    })
    .then(() => {
      const insertAboutQuery = format(
        `
                INSERT INTO about (content, url1, url2) 
                VALUES (%L, %L, %L)`,
        about[0].content,
        about[0].url1,
        about[0].url2
      );

      return db.query(insertAboutQuery);
    })
    .then(() => {
      const insertValuesQuery = format(
        `
          INSERT INTO value (content, url) 
          VALUES (%L, %L)`,
        values[0].content,
        values[0].url
      );

      return db.query(insertValuesQuery);
    })  
    .catch((err) => {
      console.error("Error in seed", err);
    });
};

module.exports = seed;