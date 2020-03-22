const router = require("express").Router();
const passport = require("passport");
const {
  CreateProduct,
  getProducts,
  DeleteProduct,
  getProductById,
  editProduct
} = require("./Product.controller");

/**
 * @swagger
 * /api/category/createproduct:
 *   post:
 *     tags:
 *       - Product
 *     name: CreateProduct
 *     summary: Creates a new Product
 *     security:
 *       - api_key: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Product Object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Product_name:
 *                  type: string
 *             SKU:
 *                  type: string
 *             Description:
 *                  type: string
 *             PurchasePrice:
 *                  type: double
 *             RetailPrice:
 *                  type: double
 *             CategoryId:
 *                  type: integer
 *             Country_Origin_id:
 *                  type: integer
 *             Image:
 *                  type: string
 *             SupplierId:
 *                  type: integer
 *             Barcode:
 *                  type: string
 *             Qty_minimum_required:
 *                  type: integer
 *             CompanyId:
 *                  type: integer
 *             required:
 *                  - Product_name
 *                  - SKU
 *                  - Description
 *                  - PurchasePrice
 *                  - RetailPrice
 *                  - CategoryId
 *                  - Country_Origin_id
 *                  - Image
 *                  - SupplierId
 *                  - Barcode
 *                  - CompanyId
 *     responses:
 *       201:
 *         description: Successfully created
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *
 */
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

/**
 * @swagger
 * /api/product/getproductbyId:
 *   get:
 *     tags:
 *        - Product
 *     name: GetProductById
 *     summary: Get a Product details by Id
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductId
 *         in: query
 *         schema:
 *           type: string
 *       - name: CompanyId
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully return a Product details
 *       400:
 *         description: Bad Request..Missing ProductId or CompanyId
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Resource doesn't exist.
 *
 */

//route to get product information by id
router.get("/getproductbyId", getProductById);

/**
 * @swagger
 * /api/product/deleteproduct:
 *   put:
 *     tags:
 *       - Product
 *     name: DeleteProduct
 *     summary: Inactive Product
 *     security:
 *       - api_key: []
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
 *             ProductId:
 *                  type: integer
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
// route to inactive product information
router.put(
  "/deleteproduct",
  passport.authenticate("jwt", { session: false }),
  DeleteProduct
);

/**
 * @swagger
 * /api/product/editproduct:
 *   put:
 *     tags:
 *        - Product
 *     name: EditProduct
 *     summary: Updates a Product details
 *     security:
 *       - api_key: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Product Object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ProductId:
 *                  type: integer
 *             ProductName:
 *                  type: string
 *             Description:
 *                  type: string
 *             PurchasePrice:
 *                  type: double
 *             RetailPrice:
 *                  type: double
 *             CategoryId:
 *                  type: integer
 *             Country_Origin_id:
 *                  type: integer
 *             Image:
 *                  type: string
 *             SupplierId:
 *                  type: integer
 *             QtyMinRequired:
 *                  type: integer
 *             CompanyId:
 *                  type: integer
 *             required:
 *                  - ProductName
 *                  - SKU
 *                  - Description
 *                  - PurchasePrice
 *                  - RetailPrice
 *                  - CategoryId
 *                  - Country_Origin_id
 *                  - Image
 *                  - SupplierId
 *                  - QtyMinRequired
 *
 *     responses:
 *       201:
 *         description: Successfully updated
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
// route to edit product
router.put(
  "/editproduct",
  passport.authenticate("jwt", { session: false }),
  editProduct
);

module.exports = router;
