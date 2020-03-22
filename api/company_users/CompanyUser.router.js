const router = require("express").Router();
const passport = require("passport");
const {
  authcompanyuser,
  createCompany,
  forgetPasswordCompany
} = require("./CompanyUser.controller");

/**
 * @swagger
 * components:
 *  schemas:
 *     CompanyUser:
 *             type: object
 *             properties:
 *                 UserId:
 *                    type: integer
 *                 Fname:
 *                    type: string
 *                 Lname:
 *                     type: string
 *                 Email:
 *                     type: string
 *                     format: email
 *                 Password:
 *                     type: string
 *                     format: password
 *                 PhoneNumber:
 *                     type: string
 *                 CompanyName:
 *                     type: string
 *                 Website:
 *                     type: string
 *                 Logo:
 *                     type: string
 *                     format: binary
 *                 Address1:
 *                     type: string
 *                 Address2:
 *                     type: string
 *                 City:
 *                     type: string
 *                 CountryId:
 *                     type: integer
 *                 ProvinceId:
 *                     type: integer
 *                 PostalCode:
 *                     type: string
 */

/**
 * @swagger
 * /api/companyuser/authcompanyuser:
 *   post:
 *     tags:
 *       - CompanyUser
 *     name: authcompanyuser
 *     summary: Logs in a companyuser
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         required:
 *           - Email
 *           - password
 *     responses:
 *       200:
 *         description: User found and logged in successfully
 *       404:
 *         description: Bad email, not found in db
 *       401:
 *         description: Username and password don't match
 *       500:
 *         description: Internal server error! SQL connection error
 */

router.post("/authcompanyuser", authcompanyuser);

/**
 * @swagger
 * /api/companyuser/createCompany:
 *   post:
 *     tags:
 *       - CompanyUser
 *     name: createCompany
 *     summary: create a company and admin profile
 *     content:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *                 Fname:
 *                    type: string
 *                 Lname:
 *                     type: string
 *                 Email:
 *                     type: string
 *                 Password:
 *                     type: string
 *                     format: password
 *                 PhoneNumber:
 *                     type: string
 *                 CompanyName:
 *                     type: string
 *                 Website:
 *                     type: string
 *                 Logo:
 *                     type: string
 *                 Address1:
 *                     type: string
 *                 Address2:
 *                     type: string
 *                 City:
 *                     type: string
 *                 CountryId:
 *                     type: integer
 *                 ProvinceId:
 *                     type: integer
 *                 PostalCode:
 *                     type: string
 *                 required:
 *                    - Fname
 *                    - Lname
 *                    - Email
 *                    - Password
 *                    - PhoneNumber
 *                    - CountryId
 *                    - CompanyName
 *                    - Logo
 *                    - Address1
 *                    - City
 *                    - ProvinceId
 *                    - PostalCode
 *     responses:
 *       200:
 *         description: company and admin profile created successfully
 *       400:
 *         description: Bad request, Display Error message
 *       500:
 *         description: Internal server error! SQL DB error
 */
router.post("/createCompany", createCompany);

/**
 * @swagger
 * /api/companyuser/forgetPasswordCompany:
 *   post:
 *     tags:
 *       - CompanyUser
 *     name: forgetPasswordCompany
 *     summary: Retrive forget password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *         required:
 *           - Email
 *     responses:
 *       200:
 *         description: Email Sent successfully
 *       404:
 *         description: Bad email, not found in db
 *       500:
 *         description: Internal server error! SQL  error
 */
router.post("/forgetPasswordCompany", forgetPasswordCompany);

module.exports = router;
