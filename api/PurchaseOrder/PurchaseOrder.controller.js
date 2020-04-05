const {
  AddPurchaseOrder,
  AddPurchaseOrder_Products,
  EditPurchaseOrder,
  EditPurchaseOrder_Products1,
  Cancelpurchase_Order,
  getAllPurchaseOrders,
  getIncomingPurchaseOrder_report,
  getPurchase_OrderbyId,
  disablePurchaseOrder,
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
          data: err,
        });
      } else if (results[5][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else if (results[5][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[6][0]["Err_msg"],
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
                data: err,
              });
            } else if (results[7][0]["status"] == null) {
              return res.status(500).json({
                success: "0",
                message: "Internal server error!",
              });
            } else if (results[7][0]["status"] == "0") {
              return res.status(400).json({
                success: "0",
                message: results[8][0]["Err_msg"],
              });
            } else {
              return res.status(201).json({
                success: "1",
                message: "Purchase Order created Successfully",
              });
            }
          }
        );
      }
    });
  },
  //Method to edit purchase order api
  editPurchaseOrder: (req, res) => {
    let purchase_ord_id = "";
    if (typeof req.body.purchase_ord_id != "undefined") {
      purchase_ord_id = req.body.purchase_ord_id;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Purchase Order Id is missing!",
      });
    }
    EditPurchaseOrder(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! please try again later",
          data: err,
        });
      } else if (results[4][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else if (results[4][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[5][0]["Err_msg"],
        });
      } else {
        EditPurchaseOrder_Products1(req, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: "0",
              message: "Internal server error! please try again later",
              data: err,
            });
          } else if (results[8][0]["status"] == null) {
            return res.status(500).json({
              success: "0",
              message: "Internal server error!",
            });
          } else if (results[8][0]["status"] == "0") {
            return res.status(400).json({
              success: "0",
              message: results[9][0]["Err_msg"],
            });
          } else {
            return res.status(200).json({
              success: "1",
              message: "Purchase Order updated Successfully",
            });
          }
        });
      }
    });
  },
  // Cancel Purchase Order --------------------------------------------->
  cancelPurchaseOrder: (req, res) => {
    let CompanyId = "";
    let Purchase_OrderId = "";
    if (typeof req.body.CompanyId != "undefined") {
      CompanyId = req.body.CompanyId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Company Id is missing!",
      });
    }
    if (typeof req.body.Purchase_OrderId != "undefined") {
      Purchase_OrderId = req.body.Purchase_OrderId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Purchase Order Id is missing!",
      });
    }
    Cancelpurchase_Order(req, (err, results) => {
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
      } else if (results.affectedRows < 1) {
        return res.status(400).json({
          success: "0",
          message: "Invalid Purchase Order Id",
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Purchase Order Cancelled Successfully",
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
        message: "Invalid request..Company Id is missing!",
      });
    }

    getAllPurchaseOrders(CompanyId, (err, results) => {
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
        if (typeof req.query.PurchaseOrderId != "undefined") {
          results.filter(function (result) {
            if (
              result.Purchase_OrderId.toString() == req.query.PurchaseOrderId
            ) {
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

        // de-duplication: by Purchase Order Id
        response = _.uniqBy(response, "Purchase_OrderId");

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

  // Function to get Incoming Purchase Orders report
  getPurchaseOrderReport: (req, res) => {
    let companyid = "";
    if (typeof req.query.companyid != "undefined") {
      companyid = req.query.companyid;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..company id is missing ",
      });
    }

    getIncomingPurchaseOrder_report(companyid, (err, results) => {
      console.log(results);
      if (err) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else {
        return res.status(200).json({
          success: "1",
          data: results,
        });
      }
    });
  },

  //****************************************************************************************** */
  // Function to get Purchase Order details by id
  GetPurchase_Orders_ProductsbyId: (req, res) => {
    if (typeof req.query.CompanyId == "undefined") {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Company Id is missing!",
      });
    }
    if (typeof req.query.PurchaseOrderId == "undefined") {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..PurchaseOrder Id is missing!",
      });
    }
    let CompanyId = req.query.CompanyId;
    let PurchaseOrderId = req.query.PurchaseOrderId;

    getPurchase_OrderbyId(CompanyId, PurchaseOrderId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! Please check request body",
        });
      } else {
        if (results[0][0] == null) {
          return res
            .status(404)
            .json({ success: "0", message: " Resource does not exist." });
        }
        if (results[1] == null) {
          return res
            .status(404)
            .json({ success: "0", message: " Resource does not exist." });
        }
        let purchaseOrder_details = results[0][0];
        let products = results[1];
        return res.status(200).json({
          success: "1",
          data: { purchaseOrder_details, products },
        });
      }
    });
  },

  //************************************************************************************************ */
  //Function to delete purchase Order
  DeletePurchaseOrder: (req, res) => {
    let purchase_orderId = "";

    if (typeof req.query.purchase_orderid != "undefined") {
      purchase_orderId = req.query.purchase_orderid;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Purchase Order id is missing ",
      });
    }
    disablePurchaseOrder(purchase_orderId, (err, results) => {
      console.log(results);
      if (err) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else if (!results) {
        return res.status(400).json({
          success: "0",
          message: "Bad request",
        });
      } else if (results.affectedRows < 1) {
        return res.status(400).json({
          success: "0",
          message: "Invalid Purchase Order Id",
        });
      } else {
        return res.status(200).json({
          success: "1",
          data: "Purchase Order Deleted Successfully!",
        });
      }
    });
  },

  ReOrderInventory: (req, res) => {
    if (typeof req.query.purchase_orderid != "undefined") {
      purchase_orderId = req.query.purchase_orderid;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Purchase Order id is missing ",
      });
    }
  },
};
