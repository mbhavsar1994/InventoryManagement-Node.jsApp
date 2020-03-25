const router = require("express").Router();

const { createSales } = require("./Sales.controller");

router.post(
  "/createsales",
  passport.authenticate("jwt", { session: false }),
  createSales
);

module.exports = router;
