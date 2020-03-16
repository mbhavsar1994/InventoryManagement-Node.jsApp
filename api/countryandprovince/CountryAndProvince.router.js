const router = require("express").Router();

const { country } = require("./CountryAndProvince.controller");

router.get("/countries", country);

module.exports = router;
