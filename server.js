const express = require('express');
const cons = require('consolidate');
const routeManager = require('./route-manager.js');
const environmentManager = require('./environment-manager.js');

environmentManager.setEnvironmentalVariables();

const app = express();
app.use('/', express.static(__dirname + '/public'));
app.use('/api', (req, res, next) => {
    next();
});
app.engine('hbs', cons.handlebars);
app.set('views', __dirname + '/templates');
app.set("view engine", 'hbs');

routeManager.configureRoutes(app);

app.listen(8081);
