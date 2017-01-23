const OAuth = require('oauth');
const bodyParser = require("body-parser");
const db = require("./queries");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

const routeManager = {
    configureRoutes(app) {
        app.get('/', (req, res) => {
            res.render('index.hbs');
        });
        app.get('/api/get_request_token', (req, res) => {
            var oauth = new OAuth.OAuth(
              'https://api.twitter.com/oauth/request_token',
              'https://api.twitter.com/oauth/access_token',
              process.env['TWITTER_ID'],
              process.env['TWITTER_SECRET'],
              '1.0A',
              'http://php-practice-cloned-sirius49.c9users.io:8080',
              'HMAC-SHA1'
            );
            
            oauth.getOAuthRequestToken({}, function(err, token, secret, parsed) {
                res.json({
                    status: "success",
                    data: {
                        token, 
                        secret
                    }
                });
            });
        });
        app.get("/api/get_access_token", function(req, res) {
            var oauth = new OAuth.OAuth(
              'https://api.twitter.com/oauth/request_token',
              'https://api.twitter.com/oauth/access_token',
              process.env['TWITTER_ID'],
              process.env['TWITTER_SECRET'],
              '1.0A',
              'http://php-practice-cloned-sirius49.c9users.io:8080',
              'HMAC-SHA1'
            );
            
            const {secret, token, verifier} = req.query;
            oauth.getOAuthAccessToken(token, secret, verifier, function(err, access_token, access_secret, result) {
                if (err) {
                    res.json({
                        status: "fail", 
                        data: {}
                            
                        });
                    return;
                }
                res.json({
                    status: "success",
                    data: {
                        access_token,
                        access_secret,
                        result
                    }
                });
            }); 
        });
        app.get("/api/getclients", db.getAllClients);
        app.get("/api/addclient", db.createClient);
        app.get("/api/polls", db.getAllPolls);
        app.get("/api/polls/:id", db.getPoll);
        app.post("/api/polls", jsonParser, db.createPoll);
        app.delete("/api/polls/:id", db.deletePoll);
        app.post("/api/query", jsonParser, db.getQueryResult);
        app.post("/api/vote", jsonParser, db.createVoter);
    }
};

module.exports = routeManager;