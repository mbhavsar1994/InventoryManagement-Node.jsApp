const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  authcustomeruser,
  createcustomeruser,
  forgetPasswordCustomer
} = require("./CustomerUser.controller");

router.get("/authcustomeruser", authcustomeruser);
<<<<<<< HEAD
router.get("/signupcustomer", signupcustomeruser);
=======
router.post("/createcustomeruser", createcustomeruser);
router.get("/forgetPasswordCustomer", forgetPasswordCustomer);

>>>>>>> f1bd1888cae56299821123dccd954754537088fd
module.exports = router;
