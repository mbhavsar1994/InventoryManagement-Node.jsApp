const {
  getcountry,
  getProvince,
  getProvinceName,
} = require("./CountryAndProvince.service");

module.exports = {
  //fetching countries
  country: (req, res) => {
    getcountry(req, (err, results) => {
      if (results.length != 0) {
        return res.status(200).json({
          success: "1",
          data: results,
        });
      } else {
        return res.status(404).json({
          success: "0",
          message: "No record found",
        });
      }
    });
  },
  //fetching provinces by passing country id
  province: (req, res) => {
    getProvince(req.body.country_id, (err, results) => {
      if (results.length != 0) {
        return res.status(200).json({
          success: 1,
          data: results,
        });
      } else {
        return res.status(404).json({
          success: 0,
          message: "No record found",
        });
      }
    });
  },
  getprovince: (req, res) => {
    getProvinceName(req.body.country_name, (err, results) => {
      if (results.length != 0) {
        return res.status(200).json({
          success: 1,
          data: results,
        });
      } else {
        return res.status(404).json({
          success: 0,
          message: "No record found",
        });
      }
    });
  },
};
