const router = require("express").Router();
const passport = require("passport");

const { upload } = require("../../index");
const {
  authcompanyuser,
  editcompanyuser,
  createCompany,
  forgetPasswordCompany,
  getUserDetailsById,
  GetCompanybyId,
  editCompanyProfile
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
 *  post:
 *     tags:
 *       - CompanyUser
 *     summary: Logs in a companyuser
 *     requestBody:
 *      description:  Company user login credential
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Username and password don't match
 *       '404':
 *         description: 'Bad email, not found in db'
 *       '500':
 *         description: Internal server error! SQL connection error
 */

router.post("/authcompanyuser", authcompanyuser);

/**
 * @swagger
 * /api/companyuser/createCompany:
 *  post:
 *     tags:
 *      - CompanyUser
 *     summary: create a company and admin profile
 *     requestBody:
 *      description: properties to create compnay user
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             Fname:
 *               type: string
 *             Lname:
 *               type: string
 *             Email:
 *               type: string
 *             Password:
 *               type: string
 *               format: password
 *             PhoneNumber:
 *               type: string
 *             CompanyName:
 *               type: string
 *             Website:
 *               type: string
 *             Logo:
 *               type: string
 *             Address1:
 *               type: string
 *             Address2:
 *               type: string
 *             City:
 *               type: string
 *             CountryId:
 *               type: integer
 *             ProvinceId:
 *               type: integer
 *             PostalCode:
 *               type: string
 *     responses:
 *       '201':
 *         description: company and admin profile created successfully
 *       '400':
 *         description: 'Bad request, Display Error message'
 *       '500':
 *         description: Internal server error! SQL DB error
 */
router.post("/createCompany", upload.single("Logo"), createCompany);

/**
 * @swagger
 * /api/companyuser/forgetPasswordCompany:
 *   post:
 *     tags:
 *       - CompanyUser
 *     summary: Retrive forget password
 *     requestBody:
 *      description: Retrive forget password
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       '200':
 *         description: Email Sent successfully
 *       '404':
 *         description: 'Bad email, not found in db'
 *       '500':
 *         description: Internal server error! SQL error
 */
router.post("/forgetPasswordCompany", forgetPasswordCompany);
router.post("/edituser",passport.authenticate("jwt", { session: false }),editcompanyuser);
router.get("/getuserdetailsbyid",passport.authenticate("jwt", { session: false }),getUserDetailsById);

router.get("/getCompanyById", GetCompanybyId);
router.put("/editCompanyProfile", upload.single("Logo"), editCompanyProfile);

module.exports = router;
