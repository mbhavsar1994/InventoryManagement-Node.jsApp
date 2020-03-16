const router = require("express").Router();
const passport = require("passport");
const { getSupplier } = require("./Supplier.controller");

router.get(
  "/getsuppliers",
  passport.authenticate("jwt", { session: false }),
  getSupplier
);

module.exports = router;
