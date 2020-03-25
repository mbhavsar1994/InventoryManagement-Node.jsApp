const {
  AddPurchaseOrder,
  AddPurchaseOrder_Products,
  EditPurchaseOrder,
  EditPurchaseOrder_Products1,
  Cancelpurchase_Order,
  getAllPurchaseOrders
} = require("./PurchaseOrder.service");

const _ = require("lodash");
module.exports = {
  // Method to create Purchase order api
  createPurchaseOrder: (req, res) => {
    AddPurchaseOrder(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! please try again later",
          data: err
        });
      } else if (results[5][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      } else if (results[5][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[6][0]["Err_msg"]
        });
      } else {
        AddPurchaseOrder_Products(
          req,
          results[7][0]["purchase_ord_id"],
          results[8][0]["delivery_id"],
          (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: "0",
                message: "Internal server error! please try again later",
                data: err
              });
            } else if (results) {
              return res.status(200).json({
                success: "1",
                message: "Purchase Order created Successfully"
              });
            }
          }
        );
      }
    });
  },
  //Method to edit purchase order api
  editPurchaseOrder: (req, res) => {
    EditPurchaseOrder(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! please try again later",
          data: err
        });
      } else if (results[4][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      } else if (results[4][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[5][0]["Err_msg"]
        });
      } else {
        EditPurchaseOrder_Products1(req, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: "0",
              message: "Internal server error! please try again later",
              data: err
            });
          } else {
            return res.status(200).json({
              success: "1",
              message: "Purchase Order updated Successfully"
            });
          }
        });
      }
    });
  },
  // Cancel Purchase Order --------------------------------------------->
  cancelPurchaseOrder: (req, res) => {
    let CompanyId = "";
    if (typeof req.body.CompanyId != "undefined") {
      CompanyId = req.body.CompanyId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Company Id is missing!"
      });
    }
    Cancelpurchase_Order(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server error!",
          data: err
        });
      } else if (!results) {
        return res.status(400).json({
          success: "0",
          message: "Bad request"
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Purchase Order Cancelled Successfully"
        });
      }
    });
  },

  // Function to Get All purchase order by supplier id, search by Param -Purchase order id,SpplierId,CompanyId
  getPurchaseOrders: (req, res) => {
    var response = [];
    console.log(req.query);

    let CompanyId = "";
    if (typeof req.body.CompanyId != "undefined") {
      CompanyId = req.body.CompanyId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Company Id is missing!"
      });
    }

    getAllPurchaseOrders(CompanyId, (err, results) => {
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
        if (typeof req.query.PurchaseOrderId != "undefined") {
          results.filter(function(result) {
            if (
              result.Purchase_OrderId.toString() == req.query.PurchaseOrderId
            ) {
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

        // de-duplication: by Purchase Order Id
        response = _.uniqBy(response, "Purchase_OrderId");

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
  }
};
