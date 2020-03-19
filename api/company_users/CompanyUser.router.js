const router = require("express").Router();
const passport = require("passport");
const {
  authcompanyuser,
  createCompany,
  forgetPasswordCompany
} = require("./CompanyUser.controller");

<<<<<<< HEAD
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
=======
router.post("/authcompanyuser", authcompanyuser);
router.post("/createCompany", createCompany);
router.post("/forgetPasswordCompany", forgetPasswordCompany);
>>>>>>> 503e8959c963212537ae7c7f2ada03d7f5991e7e

module.exports = router;
