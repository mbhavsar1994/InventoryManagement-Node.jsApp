const router = require("express").Router();
const passport = require("passport");
const {
  authcompanyuser,
  createCompany,
  forgetPasswordCompany
} = require("./CompanyUser.controller");

router.post("/authcompanyuser", authcompanyuser);
router.post("/createCompany", createCompany);
router.get("/forgetPasswordCompany", forgetPasswordCompany);

module.exports = router;
