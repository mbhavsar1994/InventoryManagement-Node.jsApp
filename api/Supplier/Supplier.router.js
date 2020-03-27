const router = require("express").Router();
const passport = require("passport");
const {
  createSupplier,
  getSupplier,
  editSupplier,
  getSupplierById
} = require("./Supplier.controller");

router.post(
  "/createSupplier",
  passport.authenticate("jwt", { session: false }),
  createSupplier
);

router.post(
  "/getsuppliers",
  passport.authenticate("jwt", { session: false }),
  getSupplier
);

router.put(
  "/editsupplier",
  passport.authenticate("jwt", { session: false }),
  editSupplier
);

router.get(
  "/getsupplierbyId",
  passport.authenticate("jwt", { session: false }),
  getSupplierById
);

module.exports = router;
