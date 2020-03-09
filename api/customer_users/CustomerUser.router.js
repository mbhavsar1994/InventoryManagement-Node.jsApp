const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { authcustomeruser } = require("./CustomerUser.controller");

router.get("/authcustomeruser", authcustomeruser);
router.get("/signupcustomer", signupcustomeruser);
module.exports = router;
