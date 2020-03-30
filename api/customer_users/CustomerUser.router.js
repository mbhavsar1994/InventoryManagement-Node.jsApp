const router = require("express").Router();
const passport = require("passport");
const {
  authcustomeruser,
  createcustomeruser,
  forgetPasswordCustomer,
  editcustomeruser,
  getUserDetailsById
} = require("./CustomerUser.controller");

router.post("/authcustomeruser", authcustomeruser);

router.post("/createcustomeruser", createcustomeruser);

router.post(
  "/editcustomeruser",
  passport.authenticate("jwt", { session: false }),
  editcustomeruser
);

router.get("/forgetPasswordCustomer", forgetPasswordCustomer);
router.get("/getuserdetailsbyid",passport.authenticate("jwt", { session: false }),getUserDetailsById)
module.exports = router;
