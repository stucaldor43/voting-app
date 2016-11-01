const routeManager = {
    configureRoutes(app) {
        app.get('/', (req, res) => {
            res.render('index.hbs');
        });
    }
};

module.exports = routeManager;