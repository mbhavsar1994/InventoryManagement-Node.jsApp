const router = require("express").Router();
const passport = require("passport");
const { getCategories } = require("./Category.contoller");

router.POST(
  "/getcategories",
  passport.authenticate("jwt", { session: false }),
  getCategories
);

module.exports = router;
