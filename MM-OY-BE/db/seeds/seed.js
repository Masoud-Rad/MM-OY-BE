const db = require('../connection');

const seed = ({logoData, mainPageData, reviewData, contactDetailsData}) => {
    return db
        .query(`DROP TABLE IF EXISTS contactdetails;`)
        .then(() => {
          return db.query(`DROP TABLE IF EXISTS review;`);
        })
        .then(() => {
          return db.query(`DROP TABLE IF EXISTS secondpage;`);
        })
        .then(() => {
          return db.query(`DROP TABLE IF EXISTS mainpage;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS logo;`);
        })
        .then(()=>{
            const logoTablePromise = db.query(`
                CREATE TABLE logo (
                company_name VARCHAR,
                logo_url VARCHAR
                );
                `);
        })
        .then(()=>{
            const mainpageTablePromise = db.query(`
                CREAT TABLE mainpage (
                title VARCHAR, 
                subtitle VARCHAR,
                content VARCHAR,
                main_url VARCHAR
                );
                `);
        })
        .then(()=>{
            const secondpagetablePromise = db.query(`
                CREATE TABLE secondpage (
                title VARCHAR,
                content VARCHAR,
                second_url VARCHAR
                );
                `);
        })
        .then(()=>{
            const reviewTablePromise = db.query(`
                CREATE TABLE review (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                content VARCHAR,
                created_at TIMESTAMP DEFAULT NOW()
                );
                `)
        })
}

module.exports = seed;