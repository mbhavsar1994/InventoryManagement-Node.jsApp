const { getAllProduct, AddProduct } = require("./Product.service");
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

  getProducts: (req, res) => {}
};
