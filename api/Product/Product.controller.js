const {
  getAllProduct,
  AddProduct,
  RemoveProduct,
  GetProductById,
  EditProduct
} = require("./Product.service");
const _ = require("lodash");

module.exports = {
  CreateProduct: (req, res) => {
    AddProduct(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          data: err
        });
      } else if (results[13][0]["status"] == null) {
        return res.status(500).json({
          success: false,
          message: "Internal server error!"
        });
      } else if (results[13][0]["status"] == "0") {
        return res.status(400).json({
          success: false,
          message: results[14][0]["Err_msg"]
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Product created Successfully"
        });
      }
    });
  },

  getProducts: (req, res) => {
    var response = [];
    console.log(req.query);

    getAllProduct(req.body.CompanyId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err
        });
      }
      if (!results.length) {
        return res
          .status(404)
          .json({ success: false, message: " Resource does not exist." });
      } else {
        if (typeof req.query.ProductName != "undefined") {
          results.filter(function(result) {
            if (result.ProductName.toString() == req.query.ProductName) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.SKU != "undefined") {
          results.filter(function(result) {
            if (result.SKU.toString() == req.query.SKU) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.category != "undefined") {
          results.filter(function(result) {
            if (result.category.toString() == req.query.category) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.SupplierName != "undefined") {
          results.filter(function(result) {
            if (result.SupplierName.toString() == req.query.SupplierName) {
              response.push(result);
            }
          });
        }

        // de-duplication:
        response = _.uniqBy(response, "ProductId");

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
  },

  // Delete Product ------------------------------------------------>
  DeleteProduct: (req, res) => {
    RemoveProduct(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          data: err
        });
      } else if (!results) {
        return res.status(400).json({
          success: false,
          message: "Bad request"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Product deleted Successfully"
        });
      }
    });
  },

  // Get Product By Id ----------------------------------------->

  getProductById: (req, res) => {
    let ProductId = "";
    let CompanyId = "";
    if (typeof req.query.ProductId != "undefined") {
      ProductId = req.query.ProductId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid request[Product Id is missing]"
      });
    }
    if (typeof req.query.CompanyId != "undefined") {
      CompanyId = req.query.CompanyId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid request[CompanyId  is missing]"
      });
    }
    GetProductById(CompanyId, ProductId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err
        });
      }
      if (!results.length) {
        return res
          .status(404)
          .json({ success: false, message: " Resource does not exist." });
      } else {
        return res.status(200).json({
          success: "200",
          data: results
        });
      }
    });
  },

  // Edit Product ---------------------------------------->
  editProduct: (req, res) => {
    EditProduct(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          data: err
        });
      } else if (results[13][0]["status"] == null) {
        return res.json({
          success: false,
          message: "Internal server error!"
        });
      } else if (results[13][0]["status"] == "0") {
        return res.json({
          success: false,
          message: results[14][0]["Err_msg"]
        });
      } else {
        return res.json({
          success: true,
          message: "Product details updated Successfully"
        });
      }
    });
  }
};
