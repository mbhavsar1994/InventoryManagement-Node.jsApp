const { add_Customer_orderDetails , addSalesorderProduct } = require("./Sales.service");

module.exports = {
  //fetching countries
  createSales: (req, res) => {
    add_Customer_orderDetails(req, (err, results) => {
      if(results[3][0].status==null)
      {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      }
      else if (results[3][0].status==0)
      {
        return res.status(400).json({
          success: "0",
          message: "Bad request error!"
        });
      }
      else
      {
        console.log(results[5][0]);
        var orderid=results[5][0].orderid;
        addSalesorderProduct(req,orderid,(err, resultss) => {
          console.log(err)
          if(err)
          {
            return res.status(500).json({
              success: "0",
              message: "Internal server error!"
            });
          }
          else{
            return res.status(200).json({
              success: "1",
              message: "order done successfully"
            });
          }
        });
      }
     // console.log(results[3][0].status);
    });
  }
};
