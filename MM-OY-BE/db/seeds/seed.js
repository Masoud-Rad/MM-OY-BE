const format = require('pg-format');
const db = require('../connection');

const seed = ({ logo, mainPage, secondPage, review, contactDetails }) => {
    return db
        .query(`DROP TABLE IF EXISTS contactdetails;`)
        .then(() => db.query(`DROP TABLE IF EXISTS review;`))
        .then(() => db.query(`DROP TABLE IF EXISTS secondpage;`))
        .then(() => db.query(`DROP TABLE IF EXISTS mainpage;`))
        .then(() => db.query(`DROP TABLE IF EXISTS logo;`))
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
                    title VARCHAR, 
                    subtitle VARCHAR,
                    content VARCHAR,
                    main_url VARCHAR
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
            
            const insertLogoAndNameQuery = format(`
                INSERT INTO logo (company_name, logo_url) 
                VALUES (%L, %L)`, logo[0].companyName, logo[0].logoUrl);
            
            return db.query(insertLogoAndNameQuery);
        })
        .then(() => {
            
            const insertMainpageQuery = format(`
                INSERT INTO mainpage (title, subtitle, content, main_url) 
                VALUES (%L, %L, %L, %L)`, mainPage[0].title, mainPage[0].subtitle, mainPage[0].content, mainPage[0].main_url);
            
            return db.query(insertMainpageQuery);
        })
        .then(() => {
            
            const insertMainpageQuery = format(`
                INSERT INTO secondpage (title, content, second_url) 
                VALUES (%L, %L, %L)`, secondPage[0].title, secondPage[0].content, secondPage[0].second_url);
            
            return db.query(insertMainpageQuery);
        })
        .then(() => {
            
            const insertReviewQuery = format(`
                INSERT INTO review (id, name, body, created_at) 
                VALUES (%L, %L, %L, %L)`, review[0].id, review[0].name, review[0].body, review[0].created_at);
            
            return db.query(insertReviewQuery);
        })
        .catch(err => {
            console.error("Error in seed", err);
          });
          
};

module.exports = seed;


