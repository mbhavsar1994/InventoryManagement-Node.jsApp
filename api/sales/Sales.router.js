const router = require("express").Router();
const passport = require("passport");
const {
  createSales,
  GetSalesOrderById,
  GetSales,
  GetHighestSoldProduct,
  GetLeastSoldProduct,
  GetRecentSalesByWeek,
  GetSalsePerCategory,
  GetSalesByCustomerId
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

router.get(
  "/getmostsoldproduct",
  passport.authenticate("jwt", { session: false }),
  GetHighestSoldProduct
);
router.get(
  "/getlowestsoldproduct",
  passport.authenticate("jwt", { session: false }),
  GetLeastSoldProduct
);

router.get(
  "/getrecentsalesbyweek",
  passport.authenticate("jwt", { session: false }),
  GetRecentSalesByWeek
);

router.get(
  "/getsalespercategory",
  passport.authenticate("jwt", { session: false }),
  GetSalsePerCategory
);
router.post("/getsalesbycustomerid", GetSalesByCustomerId);

module.exports = router;
