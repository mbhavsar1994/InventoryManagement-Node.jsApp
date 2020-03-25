const router = require("express").Router();
const { ReceivedDelivery, GetAllDelivery } = require("./Delivery.controller");

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

module.exports = router;
