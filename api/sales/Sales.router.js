const router = require("express").Router();
const passport = require("passport");
const { createSales,
    GetSalesOrderById,
    GetSales} = require("./Sales.controller");

router.post("/createsales",
passport.authenticate("jwt", { session: false }),
 createSales);

router.get("/getsalesorderbyid",
passport.authenticate("jwt", { session: false }),
 GetSalesOrderById);

 router.post("/getsales",
 passport.authenticate("jwt", { session: false }),
  GetSales);
module.exports = router;
