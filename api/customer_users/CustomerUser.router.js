const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { authcustomeruser } = require("./CustomerUser.controller");

router.get("/authcustomeruser", authcustomeruser);

module.exports = router;
