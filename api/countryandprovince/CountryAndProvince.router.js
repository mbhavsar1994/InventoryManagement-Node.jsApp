const router = require("express").Router();

const { country, province,getprovince } = require("./CountryAndProvince.controller");

router.get("/country", country);
router.post("/province", province);

router.post("/getprovince", getprovince);
module.exports = router;
