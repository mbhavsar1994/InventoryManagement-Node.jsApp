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

/**
 * @swagger
 * /api/product/getproducts:
 *   post:
 *     tags:
 *       - Product
 *     name: GetProducts
 *     summary: Returns all product for provided company Id
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             CompanyId:
 *                  type: integer
 *             required:
 *                  - CompanyId
 *       - name: ProductName
 *         in: query
 *         schema:
 *           type: string
 *       - name: SKU
 *         in: query
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *       - name: SupplierName
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully return list of Product
 *       404:
 *         description: Invalid CompanyId, not found in db
 *       401:
 *         description: No auth token
 *       500:
 *         description: Internal server error! SQL error
 */
// route to get all product information
router.post("/getproducts", getProducts);

// route to inactive product information
router.put(
  "/deleteproduct",
  passport.authenticate("jwt", { session: false }),
  DeleteProduct
);

//route to get product information by id
router.get("/getproductbyId", getProductById);

// route to edit product
router.put(
  "/editproduct",
  passport.authenticate("jwt", { session: false }),
  editProduct
);

module.exports = router;
