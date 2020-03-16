const router = require("express").Router();
const passport = require("passport");
const { createSupplier,getSupplier } = require("./Supplier.controller");

router.post("/createSupplier", passport.authenticate("jwt", { session: false }), createSupplier);

router.get(
  "/getsuppliers",
  passport.authenticate("jwt", { session: false }),
  getSupplier
);


module.exports = router;
