const pool = require("../../Config/database");

module.exports = {
  //add customer order details
  add_Customer_orderDetails: (req, callBack) => {
    let sales=req.body;
    let query=`SET @customerId=?; SET @total=?; CALL CustomerOrderDetails(@customerId,@total,@orderid,@Err,@status);select @status as status; select @err as Error;select @orderid as orderid`;
    pool.query(
      query,
      [
        sales.customerid,
        sales.total
      ],(error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      });
  },
  //adding product of particular customer order
  addSalesorderProduct: (req,orderid,callBack) => {
    let product = req.body.product;
    var products = [];
    console.log("serv"+orderid)
    for (var i = 0; i < product.length; i++)
    {
      products.push([
        orderid,
        product[i].productid,
        product[i].price,
        product[i].qty,
        product[i].subtotal
      ]);
    }
      

    let sql = `INSERT INTO Sales_Order_Products (CustomerOrderId, ProductId,Price,Quantity,SubTotal) VALUES ?; 
    Update product as a inner join Sales_Order_Products as b on a.ProductId=b.ProductId Set a.AvailableQty=(a.AvailableQty-b.Quantity) where a.ProductId=b.ProductId;`;

    pool.query(
      sql,
      [products],

      (error, resultss, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, resultss);
      }
    );
  },
  //getting order of particular company and of particular order id
  getSalesById: (orderid,companyid, callBack) => {
    let sql=`select a.CustomerOrderId, c.Fname ,a.Date,sum(Quantity),Total  from Customer_OrderDetails as a 
    inner join 
    Sales_Order_Products as b
    on
    a.CustomerOrderId=b.CustomerOrderId
    inner join 
    user_master_customer as c
    on
    c.CustomerId=a.CustomerId
    where CompanyId=0
    group by CustomerOrderId
    ;
    select a.CustomerOrderId, c.Fname ,a.Date,Sum(Quantity),a.Total  from Customer_OrderDetails as a 
    inner join 
    Sales_Order_Products as b
    on
    a.CustomerOrderId=b.CustomerOrderId
    inner join 
    user_master_customer as c
    on
    c.CustomerId=a.CustomerId
    where a.CustomerOrderId=? and c.CompanyId=?
    group by CustomerOrderId`;
    pool.query(
      sql,
      [orderid,
      companyid],

      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  //getting all the orders of particular company
  getAllSales: (companyid, callBack) => {
    let sql=`
    select a.CustomerOrderId, c.Fname ,a.Date,sum(Quantity),Total  from Customer_OrderDetails as a 
        inner join 
        Sales_Order_Products as b
        on
        a.CustomerOrderId=b.CustomerOrderId
        inner join 
        user_master_customer as c
        on
        c.CustomerId=a.CustomerId
        where CompanyId=?
        group by CustomerOrderId`;
    pool.query(
      sql,
      [companyid],

      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  }
};
