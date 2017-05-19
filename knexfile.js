module.exports = {
   client: "pg",
   version: "6.1.0",
   connection: {
       host: "localhost",
       port: 5432,
       user: process.env.DATABASE_USER,
       password: process.env.DATABASE_PASSWORD,
       database: process.env.DATABASE_NAME, 
   },
   pool: {
     min: 2,
     max: 10
   },
   useNullAsDefault: true
};