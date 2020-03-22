const router = require("express").Router();
const passport = require("passport");
const {
  getCategories,
  createCategory,
  EditCategory,
  GetCategorydetailsById
} = require("./Category.contoller");

/**
 * @swagger
 * /api/category/getcategories:
 *   post:
 *     tags:
 *       - Category
 *     name: getcategories
 *     summary: Returns all Categories for provided company Id
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
 *       - name: CategoryName
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully return list of category
 *       404:
 *         description: Invalid CompanyId, not found in db
 *       401:
 *         description: No auth token
 *       500:
 *         description: Internal server error! SQL error
 */
router.post("/getcategories", getCategories);

/**
 * @swagger
 * /api/category/createCategory:
 *   post:
 *     tags:
 *       - Category
 *     name: createCategory
 *     summary: Creates a new category
 *     security:
 *       - api_key: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: category object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoryname:
 *                  type: string
 *             SKU:
 *                  type: string
 *             tags:
 *                  type: string
 *             CompanyId:
 *                  type: integer
 *             required:
 *                  - categoryname
 *                  - SKU
 *                  - tags
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

router.post(
  "/createCategory",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

/**
 * @swagger
 * /api/category/getcategorybyId:
 *   get:
 *     tags:
 *        - Category
 *     name: GetcategorybyId
 *     summary: Get a  category details
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: CategoryId
 *         in: query
 *         schema:
 *           type: string
 *       - name: CompanyId
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully return a category details
 *       400:
 *         description: Bad Request..Missing Category or Company Id
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Resource doesn't exist.
 *
 */
router.get("/getcategorybyId", GetCategorydetailsById);

/**
 * @swagger
 * /api/category/editcategory:
 *   put:
 *     tags:
 *        - Category
 *     name: Editcategory
 *     summary: Updates a  category details
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: category object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoryId:
 *                  type: integer
 *             categoryname:
 *                  type: string
 *             SKU:
 *                  type: string
 *             tags:
 *                  type: string
 *             required:
 *                  - categoryId
 *                  - categoryname
 *                  - SKU
 *                  - tags
 *     responses:
 *       201:
 *         description: Successfully updated
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */

router.put(
  "/editcategory",
  passport.authenticate("jwt", { session: false }),
  EditCategory
);
module.exports = router;
