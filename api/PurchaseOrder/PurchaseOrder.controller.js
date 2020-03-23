const {
  AddPurchaseOrder,
  AddPurchaseOrder_Products
} = require("./PurchaseOrder.service");

module.exports = {
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
  }
};
