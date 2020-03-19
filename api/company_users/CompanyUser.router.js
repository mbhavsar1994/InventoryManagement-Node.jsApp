const router = require("express").Router();
const passport = require("passport");
const {
  authcompanyuser,
  createCompany,
  forgetPasswordCompany
} = require("./CompanyUser.controller");

router.post(
  "/authcompanyuser",
  passport.authenticate("jwt", { session: false }),
  authcompanyuser
);
router.post(
  "/createCompany",
  passport.authenticate("jwt", { session: false }),
  createCompany
);
router.get(
  "/forgetPasswordCompany",
  passport.authenticate("jwt", { session: false }),
  forgetPasswordCompany
);

module.exports = router;
