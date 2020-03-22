const { create_sales,  } = require("./Sales.service");

module.exports = {
  //fetching countries
  createSales: (req, res) => {
    create_sales(req, (err, results) => {
      if (results.length != 0) {
        return res.status(200).json({
          success: "1",
          data: results
        });
      } else {
        return res.status(404).json({
          success: "0",
          data: "No record found"
        });
      }
    });
  }
};
