const router = require("express").Router();
const passport = require("passport");
const {
  CreateProduct,
  getProducts,
  DeleteProduct,
  getProductById,
  editProduct
} = require("./Product.controller");

router.post(
  "/createproduct",
  passport.authenticate("jwt", { session: false }),
  CreateProduct
);
router.get(
  "/getproducts",
  passport.authenticate("jwt", { session: false }),
  getProducts
);
router.put(
  "/deleteproduct",
  passport.authenticate("jwt", { session: false }),
  DeleteProduct
);

router.get(
  "/getproductbyId",
  passport.authenticate("jwt", { session: false }),
  getProductById
);

router.put(
  "/editproduct",
  passport.authenticate("jwt", { session: false }),
  editProduct
);

module.exports = router;
