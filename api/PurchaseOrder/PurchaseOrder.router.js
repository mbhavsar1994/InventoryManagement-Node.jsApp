const router = require("express").Router();
const passport = require("passport");

const {
  createPurchaseOrder,
  editPurchaseOrder
} = require("./PurchaseOrder.controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPurchaseOrder
);

router.put("/edit", editPurchaseOrder);
module.exports = router;
