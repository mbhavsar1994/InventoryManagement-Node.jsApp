const {
  getAllProduct,
  AddProduct,
  RemoveProduct,
  GetProductById,
  EditProduct,
  getFeatureProduct,
  valuation,
  articles,
  incoming_products,
} = require("./Product.service");
const _ = require("lodash");
const IPConfig = require("../../Config/Server_IP");

module.exports = {
  // Function to create product  for company
  CreateProduct: (req, res) => {
    if (typeof req.file.filename == "undefined") {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Product Image is missing!",
      });
    }

    AddProduct(req, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
          data: err,
        });
      } else if (results[13][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else if (results[13][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[14][0]["Err_msg"],
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Product created Successfully",
        });
      }
    });
  },
  //------------------------------------------------------------------------------------------------------

  // Function to Get All product by company id , search by Param -ProductName,SKU,category,SupplierName
  getProducts: (req, res) => {
    var response = [];
    console.log(req.query);

    if (typeof req.body.CompanyId == "undefined") {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..CompanyId id is missing!",
      });
    }

    getAllProduct(req.body.CompanyId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server Error",
          error: err,
        });
      }
      if (!results.length) {
        return res.status(200).json({
          success: "1",
          message: " Resource does not exist.",
          data: [],
        });
      } else {
        for (var i in results) {
          results[i].Image =
            "https://api-tradego.herokuapp.com/uploads/" + results[i].Image;
        }

        if (typeof req.query.ProductName != "undefined") {
          results.filter(function (result) {
            if (
              _.includes(result.ProductName.toString(), req.query.ProductName)
            ) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.SKU != "undefined") {
          results.filter(function (result) {
            if (_.includes(result.SKU.toString(), req.query.SKU)) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.category != "undefined") {
          results.filter(function (result) {
            if (result.category.toString() == req.query.category) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.SupplierName != "undefined") {
          results.filter(function (result) {
            if (result.SupplierName.toString() == req.query.SupplierName) {
              response.push(result);
            }
          });
        }
        if (typeof req.query.SupplierId != "undefined") {
          results.filter(function (result) {
            if (result.SupplierId.toString() == req.query.SupplierId) {
              response.push(result);
            }
          });
        }

        // de-duplication: by product id
        response = _.uniqBy(response, "ProductId");

        // in case no filtering has been applied, respond with all stores
        if (Object.keys(req.query).length === 0) {
          response = results;
        }

        if (response.length == 0) {
          return res.status(200).json({
            success: "1",
            data: [],
          });
        }
        return res.status(200).json({
          success: "1",
          data: response,
        });
      }
    });
  },
  //---------------------------------------------------------------------------------------------------

  //Function to  Delete Product by  by product id  ------------------------------------------------>
  DeleteProduct: (req, res) => {
    let ProductId = "";
    if (typeof req.body.ProductId != "undefined") {
      ProductId = req.query.ProductId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Product Id is missing!",
      });
    }

    RemoveProduct(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server error!",
          data: err,
        });
      } else if (!results) {
        return res.status(400).json({
          success: "0",
          message: "Bad request",
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Product deleted Successfully",
        });
      }
    });
  },
  //------------------------------------------------------------------------------------------------------------

  // Function to Get Product By Id ----------------------------------------->

  getProductById: (req, res) => {
    let ProductId = "";
    let CompanyId = "";
    if (typeof req.query.ProductId != "undefined") {
      ProductId = req.query.ProductId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Product Id is missing ",
      });
    }
    if (typeof req.query.CompanyId != "undefined") {
      CompanyId = req.query.CompanyId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..CompanyId  is missing ",
      });
    }
    GetProductById(CompanyId, ProductId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server Error",
          error: err,
        });
      }
      if (!results.length) {
        return res
          .status(404)
          .json({ success: "0", message: " Resource does not exist." });
      } else {
        for (var i in results) {
          results[i].Image =
            "https://api-tradego.herokuapp.com/uploads/" + results[i].Image;
        }
        return res.status(200).json({
          success: "1",
          data: results,
        });
      }
    });
  },
  //-------------------------------------------------------------------------------------------------

  //Function to  Edit Product details ---------------------------------------->
  editProduct: (req, res) => {
    EditProduct(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! Please try again",
          data: err,
        });
      } else if (results[12][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else if (results[12][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[13][0]["Err_msg"],
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Product details updated Successfully",
        });
      }
    });
  },

  //get product that are sales mostly in last 30 days
  featureProduct: (req, res) => {
    let companyid = 0;
    if (req.query.companyid == undefined) {
      return res.status(400).json({
        success: "0",
        message: "company id needed!",
      });
    } else {
      companyid = req.query.companyid;
      console.log(companyid);
      getFeatureProduct(companyid, (err, results) => {
        console.log(results[1]);
        if (err) {
          return res.status(500).json({
            success: "0",
            message: "Internal server error!",
          });
        } else if (results == null) {
          return res.status(500).json({
            success: "0",
            message: "Internal server error!",
          });
        } else {
          for (var i in results[1]) {
            results[1][i].image =
              "https://api-tradego.herokuapp.com/uploads/" +
              results[1][i].image;
          }
          return res.status(200).json({
            success: "1",
            data: results[1],
          });
        }
      });
    }
  },
  //total valuation
  totalvaluation: (req, res) => {
    let companyid = 0;
    if (req.query.companyid == undefined) {
      return res.status(400).json({
        success: "0",
        message: "company id needed!",
      });
    } else {
      companyid = req.query.companyid;
      console.log(companyid);
      valuation(companyid, (err, results) => {
        //console.log(results[0]);
        if (err) {
          return res.status(500).json({
            success: "0",
            message: "Internal server error!",
          });
        } else if (results == undefined) {
          console.log(results[0]);
          return res.status(500).json({
            success: "0",
            message: "Internal server error!",
          });
        } else {
          console.log("hi" + results[0]["sum"]);
          return res.status(200).json({
            success: "1",
            data: results[0]["sum"],
          });
        }
      });
    }
  },
  //total_articles
  totalarticle: (req, res) => {
    let companyid = 0;
    if (req.query.companyid == undefined) {
      return res.status(400).json({
        success: "0",
        message: "company id needed!",
      });
    } else {
      companyid = req.query.companyid;
      console.log(companyid);
      articles(companyid, (err, results) => {
        console.log(results[0]);
        if (err) {
          return res.status(500).json({
            success: "0",
            message: "Internal server error!",
          });
        } else if (results == undefined) {
          console.log(results[0]);
          return res.status(500).json({
            success: "0",
            message: "Internal server error!",
          });
        } else {
          console.log("hi" + results[0]["sum"]);
          return res.status(200).json({
            success: "1",
            data: results[0]["sum"],
          });
        }
      });
    }
  },

  // Total Of Current Incoming Products --------------------------------------------->
  Incoming_Products: (req, res) => {
    let CompanyId = 0;
    if (req.query.CompanyId == undefined) {
      return res.status(400).json({
        success: "0",
        message: "CompanyId is Missing!",
      });
    } else {
      CompanyId = req.query.CompanyId;
      incoming_products(CompanyId, (err, results) => {
        console.log(results[0]);
        if (err) {
          return res.status(500).json({
            success: "0",
            message: "Internal server error!",
          });
        } else if (results == undefined) {
          console.log(results[0]);
          return res.status(500).json({
            success: "0",
            message: "Internal server error!",
          });
        } else {
          return res.status(200).json({
            success: "1",
            data: results[0]["Total Unit"],
          });
        }
      });
    }
  },
};
