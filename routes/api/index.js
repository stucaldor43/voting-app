const router = require("express").Router();

router.use("/clients", require("./clients"));
router.use("/polls", require("./polls"));
router.use("/options", require("./poll_options"))

module.exports = router;