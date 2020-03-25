const router = require("express").Router();
const { ReceivedDelivery, GetAllDelivery } = require("./Delivery.controller");

router.post("/create", ReceivedDelivery);

router.post("/getdeliveries", GetAllDelivery);

module.exports = router;
