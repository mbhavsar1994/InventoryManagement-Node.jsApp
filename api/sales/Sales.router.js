const router = require("express").Router();
const passport = require("passport");
const {
  createSales,
  GetSalesOrderById,
  GetSales,
  GetHighestSoldProduct,
  GetLeastSoldProduct,
  GetRecentSalesByWeek,
  GetSalsePerCategory
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

router.get("/getrecentsalesbyweek", GetRecentSalesByWeek);

router.get("/getsalespercategory", GetSalsePerCategory);

module.exports = router;
