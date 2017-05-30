const PollOption  = require("./../../models/PollOption");
const bodyParser = require("body-parser");
const objection = require("objection");
const jsonParser = bodyParser.json();
const jsend = require("./../../helpers/jsend");
const router = require("express").Router();

router.get("/", (req, res, next) => {
    PollOption
      .query()
      .then((options) => {
        res.set("Content-Type", "application/json");
        res.send(jsend.success({ options: options.map((option) => option.toJSON()) }))
      })
      .catch(next)
});

module.exports = router;