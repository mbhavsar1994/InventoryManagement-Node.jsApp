const router = require("express").Router();
const passport = require("passport");
const { getCategories,createCategory } = require("./Category.contoller");

router.post(
  "/getcategories",
  passport.authenticate("jwt", { session: false }),
  getCategories
);
router.post("/createCategory",passport.authenticate("jwt", { session: false }),createCategory);
module.exports = router;
