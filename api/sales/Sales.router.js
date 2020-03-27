const router = require("express").Router();
const passport = require("passport");
const {
  createSales,
  GetSalesOrderById,
  GetSales,
  GetHighestSoldProduct,
  GetLeastSoldProduct
} = require("./Sales.controller");

router.post(
  "/createsales",
  passport.authenticate("jwt", { session: false }),
  createSales
);

router.get(
  "/getsalesorderbyid",
  passport.authenticate("jwt", { session: false }),
  GetSalesOrderById
);

router.post(
  "/getsales",
  passport.authenticate("jwt", { session: false }),
  GetSales
);

router.get("/getmostsoldproduct", GetHighestSoldProduct);
router.get("/getlowestsoldproduct", GetLeastSoldProduct);
module.exports = router;
