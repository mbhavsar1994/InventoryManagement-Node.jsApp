const router = require("express").Router();
<<<<<<< HEAD

const { createSupplier } = require("./Supplier.controller");

router.post("/createSupplier", createSupplier);
=======
const passport = require("passport");
const { getSupplier } = require("./Supplier.controller");

router.get(
  "/getsuppliers",
  passport.authenticate("jwt", { session: false }),
  getSupplier
);

>>>>>>> e1c708ae8e597d3acef3c4bb764c9ed17a1b88d4
module.exports = router;
