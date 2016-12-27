const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    database: process.env["DATABASE_NAME"],
    password: process.env["DATABASE_PASSWORD"],
    port: 5432,
    host: "localhost",
    ssl: false,
    max: 20,
    idleTimeoutMillis: 20000
});

const tableCreationStatements = [`CREATE TABLE Client ( id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL UNIQUE);`,
`CREATE TABLE Poll ( id SERIAL PRIMARY KEY, title VARCHAR(128) NOT NULL, fk_client_id INTEGER REFERENCES Client(id));`,
`CREATE TABLE PollOptions ( id SERIAL PRIMARY KEY, message VARCHAR(256) NOT NULL, votes INTEGER NOT NULL DEFAULT 0, fk_poll_id INTEGER REFERENCES Poll(id));`,
`CREATE TABLE Voter ( id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL UNIQUE, fk_poll_id INTEGER REFERENCES Poll(id));`];

pool.query(tableCreationStatements.join(""));
