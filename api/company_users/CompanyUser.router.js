const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { authcompanyuser, createCompany } = require("./CompanyUser.controller");

router.get("/authcompanyuser", authcompanyuser);
router.post("/createCompany", createCompany);

module.exports = router;
