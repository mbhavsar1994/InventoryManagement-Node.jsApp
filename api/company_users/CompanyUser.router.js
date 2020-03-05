const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { authcompanyuser } = require("./CompanyUser.controller");

router.get("/authcompanyuser", authcompanyuser);

module.exports = router;
