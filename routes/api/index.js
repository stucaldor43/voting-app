const router = require("express").Router();

router.use("/clients", require("./clients"));
router.use("/polls", require("./polls"));

module.exports = router;