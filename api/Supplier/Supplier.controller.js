const { getAllSupplier } = require("./Supplier.service");
const _ = require("lodash");

module.exports = {
  getSupplier: (req, res) => {
    var response = [];
    console.log(req.query);

    getAllSupplier(req.body.CompanyId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err
        });
      }
      if (!results) {
        return res
          .status(404)
          .json({ success: false, message: " Resource does not exist." });
      } else {
        if (typeof req.query.SupplierName != "undefined") {
          results.filter(function(result) {
            if (result.SupplierName.toString() == req.query.SupplierName) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.SupplierId != "undefined") {
          results.filter(function(result) {
            if (result.SupplierId.toString() == req.query.SupplierId) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.City != "undefined") {
          results.filter(function(result) {
            if (result.City.toString() == req.query.City) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.CountryName != "undefined") {
          results.filter(function(result) {
            if (result.CountryName.toString() == req.query.CountryName) {
              response.push(result);
            }
          });
        }

        // de-duplication:
        response = _.uniqBy(response, "SupplierId");

        // in case no filtering has been applied, respond with all stores
        if (Object.keys(req.query).length === 0) {
          response = results;
        }

        return res.status(200).json({
          success: "200",
          data: response
        });
      }
    });
  }
};
