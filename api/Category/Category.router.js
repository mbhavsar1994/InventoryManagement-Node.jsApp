const router = require("express").Router();
const passport = require("passport");
const {
  getCategories,
  createCategory,
  EditCategory,
  GetCategorydetailsById
} = require("./Category.contoller");

router.post(
  "/getcategories",
  passport.authenticate("jwt", { session: false }),
  getCategories
);
router.post(
  "/createCategory",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

router.get(
  "/getcategorybyId",
  passport.authenticate("jwt", { session: false }),
  GetCategorydetailsById
);

router.put(
  "/editcategory",
  passport.authenticate("jwt", { session: false }),
  EditCategory
);
module.exports = router;
