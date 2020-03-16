const router = require("express").Router();

const {
  country,province
} = require("./CountryAndProvince.controller");

router.get("/g", country);
router.get("/provinces", province);

module.exports = router;
