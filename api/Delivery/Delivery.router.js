const router = require("express").Router();
const passport = require("passport");
const {
  ReceivedDelivery,
  GetAllDelivery,
  GetDelivery_ProductsbyId,
} = require("./Delivery.controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  ReceivedDelivery
);

router.post(
  "/getdeliveries",
  passport.authenticate("jwt", { session: false }),
  GetAllDelivery
);

router.get(
  "/getdeliverybyid",
  passport.authenticate("jwt", { session: false }),
  GetDelivery_ProductsbyId
);

module.exports = router;
