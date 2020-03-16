const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  authcustomeruser,
  createcustomeruser,
  forgetPasswordCustomer
} = require("./CustomerUser.controller");

router.get("/authcustomeruser", authcustomeruser);



router.post("/createcustomeruser", createcustomeruser);

router.get("/forgetPasswordCustomer", forgetPasswordCustomer);


module.exports = router;
