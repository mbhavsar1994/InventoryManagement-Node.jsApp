const router = require("express").Router();
const {
  authcustomeruser,
  createcustomeruser,
  forgetPasswordCustomer,
  editcustomeruser
} = require("./CustomerUser.controller");

router.post("/authcustomeruser", authcustomeruser);

router.post("/createcustomeruser", createcustomeruser);

router.post("/editcustomeruser", editcustomeruser);

router.get("/forgetPasswordCustomer", forgetPasswordCustomer);

module.exports = router;
