const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  authcompanyuser,
  createCompany,
  forgetPasswordCompany
} = require("./CompanyUser.controller");

router.get("/authcompanyuser", authcompanyuser);
router.post("/createCompany", createCompany);
router.get("/forgetPasswordCompany", forgetPasswordCompany);

module.exports = router;
