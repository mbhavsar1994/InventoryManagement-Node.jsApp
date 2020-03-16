const { CreateNewSupplier } = require("./Supplier.service");

module.exports = {
  // Create suppliers ------------------->
  createSupplier: (req, res) => {
    CreateNewSupplier(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err
        });
      } else if (results[12][0]["status"] == null) {
        return res.json({
          success: 0,
          message: "Internal server error!"
        });
      } else if (results[12][0]["status"] == "0") {
        return res.json({
          success: 0,
          message: results[13][0]["Err_msg"]
        });
      } else {
        return res.json({
          success: 1,
          message: "Supplier created Successfully"
        });
      }
    });
  }
};
