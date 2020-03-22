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
 *     summary: Creates a new Product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: properties to create new product
 *       required: true
 *       content:
 *        application/json:
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
 *                  type: integer
 *             RetailPrice:
 *                  type: integer
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
 *     responses:
 *       201:
 *         description: Successfully created
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unathorized request
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
 *  post:
 *     tags:
 *       - Product
 *     summary: Returns all product for provided company Id
 *     requestBody:
 *       description: properties to get products for provided company
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             CompanyId:
 *               type: integer
 *     parameters:
 *       - in: query
 *         name: ProductName
 *         schema:
 *           type: string
 *       - in: query
 *         name: SKU
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: SupplierName
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully return list of Product
 *       '404':
 *         description: 'Invalid CompanyId, not found in db'
 *       '500':
 *         description: Internal server error! SQL error
 */
// route to get all product information
router.post("/getproducts", getProducts);

/**
 * @swagger
 * /api/product/getproductbyId:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a Product details by Id
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
 *       '200':
 *         description: Successfully return a Product details
 *       '400':
 *         description: Bad Request..Missing ProductId or CompanyId
 *       '404':
 *         description: Resource doesn't exist.
 *       '500':
 *         description: Internal server error
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
 *     summary: Inactive Product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: properties to inactive product for provided product id
 *       required: true
 *       content:
 *        application/json:
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
 *     summary: Updates a Product details
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: properties to edit product
 *       required: true
 *       content:
 *        application/json:
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
 *                  type: integer
 *             RetailPrice:
 *                  type: integer
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
