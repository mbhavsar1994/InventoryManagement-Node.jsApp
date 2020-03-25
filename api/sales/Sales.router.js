const router = require("express").Router();

const { createSales} = require("./Sales.controller");

router.post("/createsales", createSales);


module.exports = router;
