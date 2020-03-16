const router = require("express").Router();

const {
  country,
} = require("./CountryAndProvince.controller");

router.post("/g", country);


module.exports = router;
