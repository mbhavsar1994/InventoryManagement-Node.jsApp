const router = require("express").Router();

const { createSupplier } = require("./Supplier.controller");

router.post("/createSupplier", createSupplier);
module.exports = router;
