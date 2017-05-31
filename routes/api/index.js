const OAuth = require('oauth');
const router = require("express").Router();

router.get("/get_request_token", (req, res) => {
    const oauth = new OAuth.OAuth(
              'https://api.twitter.com/oauth/request_token',
              'https://api.twitter.com/oauth/access_token',
              process.env['TWITTER_ID'],
              process.env['TWITTER_SECRET'],
              '1.0A',
              process.env['APP_CALLBACK_URL'],
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
router.get("/get_access_token", (req, res) => {
    const oauth = new OAuth.OAuth(
              'https://api.twitter.com/oauth/request_token',
              'https://api.twitter.com/oauth/access_token',
              process.env['TWITTER_ID'],
              process.env['TWITTER_SECRET'],
              '1.0A',
              process.env['APP_CALLBACK_URL'],
              'HMAC-SHA1'
            );
            
            const {secret, token, verifier} = req.query;
            oauth.getOAuthAccessToken(token, secret, verifier, function(err, access_token, access_secret, user) {
                if (err) {
                    res.json({
                        status: "fail", 
                        data: {}
                            
                        });
                    return;
                }
                req.session.username = user.screen_name;
                res.json({
                    status: "success",
                    data: {
                        access_token,
                        access_secret,
                        user
                    }
                });
            });
});
router.use("/clients", require("./clients"));
router.use("/polls", require("./polls"));
router.use("/options", require("./poll_options"))

module.exports = router;