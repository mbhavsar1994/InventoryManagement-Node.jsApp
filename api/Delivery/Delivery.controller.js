const {
  receiveDelivery,
  getAllDeliverydetails,
  getDeliverybyId,
} = require("./Delivery.service");

const _ = require("lodash");

module.exports = {
  // Function to receive delivery update
  ReceivedDelivery: (req, res) => {
    if (
      typeof req.body.PurchaseOrderId != "undefined" &&
      typeof req.body.PurchaseOrderId != ""
    ) {
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Purchase Order Id is missing!",
      });
    }
    receiveDelivery(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! Please check request body",
        });
      } else if (results[2][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else if (results[2][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[3][0]["Err_msg"],
        });
      } else {
        return res.status(201).json({
          success: "1",
          message: "Delivery created Successfully",
        });
      }
    });
  },
  // function to get all delivery result and search
  GetAllDelivery: (req, res) => {
    let CompanyId = "";
    let response = [];
    if (typeof req.body.CompanyId != "undefined") {
      CompanyId = req.body.CompanyId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..CompanyId  is missing!",
      });
    }
    getAllDeliverydetails(CompanyId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server Error! Please try agian",
          error: err,
        });
      }
      if (!results.length) {
        return res
          .status(404)
          .json({ success: "0", message: " Resource does not exist." });
      } else {
        if (typeof req.query.SupplierName != "undefined") {
          results.filter(function (result) {
            if (result.SupplierName.toString() == req.query.SupplierName) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.DeliveryId != "undefined") {
          results.filter(function (result) {
            if (result.DeliveryId.toString() == req.query.DeliveryId) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.Status != "undefined") {
          results.filter(function (result) {
            if (result.Status.toString() == req.query.Status) {
              response.push(result);
            }
          });
        }

        // de-duplication: by Delivery id
        response = _.uniqBy(response, "DeliveryId");

        // in case no filtering has been applied, respond with all stores
        if (Object.keys(req.query).length === 0) {
          response = results;
        }

        return res.status(200).json({
          success: "1",
          data: response,
        });
      }
    });
  },
  GetDelivery_ProductsbyId: (req, res) => {
    if (typeof req.query.DeliveryId == "undefined") {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Delivery  Id is missing!",
      });
    }
    let CompanyId = req.query.CompanyId;
    let DeliveryId = req.query.DeliveryId;

    getDeliverybyId(DeliveryId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! Please check request body",
        });
      } else {
        if (results[0].length == 0) {
          return res
            .status(404)
            .json({ success: "0", message: " Resource does not exist." });
        }
        if (results[1].length == 0) {
          return res
            .status(404)
            .json({ success: "0", message: " Resource does not exist." });
        }
        let delivery_details = results[0][0];
        let products = results[1];
        return res.status(200).json({
          success: "1",
          data: { delivery_details, products },
        });
      }
    });
  },
};
