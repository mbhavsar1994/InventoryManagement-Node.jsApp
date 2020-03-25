const { add_Customer_orderDetails ,
   addSalesorderProduct,
  getSalesById,
  getAllSales } = require("./Sales.service");
  const _ = require("lodash");

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
  },
  GetSalesOrderById: (req, res) => {
    let orderid="";
    let companyid="";
    if (typeof req.query.orderid != "undefined") {
      orderid = req.query.orderid;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..customer order id is missing "
      });
    }
    if (typeof req.query.companyid != "undefined") {
      companyid = req.query.companyid;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..company id is missing "
      });
    }
    getSalesById(orderid,companyid, (err, results) => {
      console.log(results);
      if(err)
      {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      }
      else
      {
        return res.status(200).json({
          success: "1",
          data:results
        });
      }
    });
  },
  GetSales: (req, res) => {
    var response = [];
    console.log(req.body.companyid);
    let companyid="";
    if (typeof req.body.companyid !="") {
      companyid = req.body.companyid ;
    }
    else{
      return res.status(400).json({
        success: "0",
        message: "company id cannot be null!"
      });
    }
    getAllSales(companyid, (err, results) => {
      //console.log(results);
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server Error",
          error: err
        });
      }
      if (results.length==0) 
      {
        return res.status(404).json
        ({ success: "0",
           message: " Resource does not exist." 
          });
      } else
       {
        if (typeof req.query.CustomerOrderId != "undefined") {
          results.filter(function(result) {
            if (result.CustomerOrderId.toString() == req.query.CustomerOrderId) {
              response.push(result);
            }
          });
        }

        if (typeof req.query.Date != "undefined") {
          results.filter(function(result) {
            if (result.Date.toString() == req.query.Date) {
              response.push(result);
            }
          });
        }
        // de-duplication: by product id
        response = _.uniqBy(response, "CustomerOrderId");

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
