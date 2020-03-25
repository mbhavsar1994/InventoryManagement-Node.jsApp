const {
  CreateNewSupplier,
  getAllSupplier,
  EditSupplier,
  GetSupplierById
} = require("./Supplier.service");

const _ = require("lodash");
module.exports = {
  //Function to  Create suppliers  ------------------->

  createSupplier: (req, res) => {
    CreateNewSupplier(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! please try again later",
          data: err
        });
      } else if (results[12][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      } else if (results[12][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[13][0]["Err_msg"]
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Supplier created Successfully"
        });
      }
    });
  },
  //-------------------------------------------------------------------------------------------------------

  // Function to Get all supplier by company Id, Search by Param -SupplierName,SupplierId,City,CountryName

  getSupplier: (req, res) => {
    var response = [];
    console.log(req.query);

    if (typeof req.body.CompanyId == "undefined") {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..CompanyId id is missing!"
      });
    }

    getAllSupplier(req.body.CompanyId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server Error",
          error: err
        });
      }
      if (!results.length) {
        return res
          .status(404)
          .json({ success: "0", message: " Resource does not exist." });
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

        // de-duplication: by supplier id
        response = _.uniqBy(response, "SupplierId");

        // in case no filtering has been applied, respond with all stores
        if (Object.keys(req.query).length === 0) {
          response = results;
        }

        return res.status(200).json({
          success: "1",
          data: response
        });
      }
    });
  },

  //----------------------------------------------------------------------------------------------

  // Function to Edit Supplier details

  editSupplier: (req, res) => {
    EditSupplier(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error",
          data: err
        });
      } else if (results[13][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      } else if (results[13][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[14][0]["Err_msg"]
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Supplier details updated Successfully"
        });
      }
    });
  },
  //--------------------------------------------------------------------------------------------

  // Function to get Supplier details by supplier id and company id
  getSupplierById: (req, res) => {
    let SupplierId = "";
    let CompanyId = "";
    if (typeof req.query.SupplierId != "undefined") {
      SupplierId = req.query.SupplierId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..supplier id is missing!"
      });
    }
    if (typeof req.query.CompanyId != "undefined") {
      CompanyId = req.query.CompanyId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..CompanyId  is missing!"
      });
    }
    GetSupplierById(CompanyId, SupplierId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server Error! Please try agian",
          error: err
        });
      }
      if (!results.length) {
        return res
          .status(404)
          .json({ success: "0", message: " Resource does not exist." });
      } else {
        return res.status(200).json({
          success: "1",
          data: results
        });
      }
    });
  }
};
