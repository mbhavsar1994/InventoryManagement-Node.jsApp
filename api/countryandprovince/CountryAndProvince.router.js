const router = require("express").Router();

const { country, province } = require("./CountryAndProvince.controller");

router.get("/country", country);
router.get("/province", province);

module.exports = router;
