const Pool = require('pg').Pool;

var pool = new Pool({
    user: "postgres",
    database: process.env['DATABASE_NAME'],
    password: process.env['DATABASE_PASSWORD'],
    port: 5432,
    host: "localhost",
    ssl: false,
    max: 20,
    idleTimeoutMillis: 1000
});

pool.query(["DELETE FROM Client;",
"DELETE FROM poll;",
"DELETE FROM PollOptions;",
"DELETE FROM Voter;"].join(""));





