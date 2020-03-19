const router = require("express").Router();

const { country, province } = require("./CountryAndProvince.controller");

router.get("/country", country);
router.post("/province", province);

module.exports = router;
