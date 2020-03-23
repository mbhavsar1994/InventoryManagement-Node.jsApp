const router = require("express").Router();
const passport = require("passport");

const { createPurchaseOrder } = require("./PurchaseOrder.controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPurchaseOrder
);
module.exports = router;
