const express = require('express');
const cons = require('consolidate');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const objection = require("objection");
const Knex = require('knex');
const Model = require("objection").Model;
const knexConfig = require("./knexfile");

const knex = Knex(knexConfig);
const store = new KnexSessionStore({
    knex: knex,
    tablename: 'sessions', // optional. Defaults to 'sessions'
    createtable: true
});
Model.knex(knex);

// const schemaPromise = require("./initial_schema").up(knex);
// schemaPromise
//   .then(() => console.log("database initialized"))

const app = express();
app.use('/', express.static(__dirname + '/public'));
app.use('/', session({
    name: "app.sid",
    secret: process.env['SESSION_SECRET'],
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use('/', require("./routes"));
app.engine('hbs', cons.handlebars);
app.set('views', __dirname + '/views');
app.set("view engine", 'hbs');

app.listen(8081);
