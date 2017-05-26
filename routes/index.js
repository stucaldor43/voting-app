const router = require("express").Router();

router.get("/", (req, res) => res.render("index.hbs"));
router.use("/api", require("./api"));

module.exports = router;