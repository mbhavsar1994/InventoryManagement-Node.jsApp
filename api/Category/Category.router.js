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
 *     summary: Returns all Categories for provided company Id
 *     requestBody:
 *      description: all Categories for provided company
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             CompanyId:
 *                  type: integer
 *     parameters:
 *       - in: query
 *         name: CategoryName
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully return list of category
 *       404:
 *         description: Invalid CompanyId, not found in db
 *       500:
 *         description: Internal server error! SQL error
 */
router.post("/getcategories", getCategories);

/**
 * @swagger
 * /api/category/createCategory:
 *  post:
 *     tags:
 *      - Category
 *     summary: Creates a new category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      description: properties to create new category
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             categoryname:
 *               type: string
 *             SKU:
 *               type: string
 *             tags:
 *               type: string
 *             CompanyId:
 *               type: integer
 *     responses:
 *       '201':
 *         description: Successfully created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: No auth token
 *       '500':
 *         description: Internal server error
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
 *     summary: Get a  category details
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: CompanyId
 *         schema:
 *           type: integer
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
 *     summary: Updates a  category details
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      description: properties to edit category
 *      required: true
 *      content:
 *        application/json:
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
 *     responses:
 *       201:
 *         description: Successfully updated
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *       401:
 *         description: No auth token
 */

router.put("/editcategory", EditCategory);
module.exports = router;
