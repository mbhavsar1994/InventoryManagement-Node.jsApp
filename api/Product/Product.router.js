const router = require("express").Router();
const passport = require("passport");
const {
  CreateProduct,
  getProducts,
  DeleteProduct,
  getProductById,
  editProduct
} = require("./Product.controller");

//route to create product
router.post(
  "/createproduct",
  passport.authenticate("jwt", { session: false }),
  CreateProduct
);
// route to get all product information
router.get(
  "/getproducts",
  passport.authenticate("jwt", { session: false }),
  getProducts
);
// route to inactive product information
router.put(
  "/deleteproduct",
  passport.authenticate("jwt", { session: false }),
  DeleteProduct
);

//route to get product information by id
router.get(
  "/getproductbyId",
  passport.authenticate("jwt", { session: false }),
  getProductById
);

// route to edit product
router.put(
  "/editproduct",
  passport.authenticate("jwt", { session: false }),
  editProduct
);

module.exports = router;
