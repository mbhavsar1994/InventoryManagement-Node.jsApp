const router = require("express").Router();
const passport = require("passport");
const {
  CreateProduct,
  getProducts,
  DeleteProduct
} = require("./Product.controller");

router.post(
  "/createproduct",
  passport.authenticate("jwt", { session: false }),
  CreateProduct
);
router.post(
  "/getproducts",
  passport.authenticate("jwt", { session: false }),
  getProducts
);
router.put(
  "/deleteproduct",
  passport.authenticate("jwt", { session: false }),
  DeleteProduct
);

module.exports = router;
