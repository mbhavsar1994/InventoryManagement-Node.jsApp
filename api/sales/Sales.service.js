const pool = require("../../Config/database");

module.exports = {
  //add customer order details
  add_Customer_orderDetails: (req, callBack) => {
    let sales = req.body;
    let query = `SET @customerId=?; SET @total=?; CALL CustomerOrderDetails(@customerId,@total,@orderid,@Err,@status);select @status as status; select @err as Error;select @orderid as orderid`;
    pool.query(
      query,
      [sales.customerid, sales.total],
      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  //adding product of particular customer order
  addSalesorderProduct: (req, orderid, callBack) => {
    let product = req.body.product;
    var products = [];
    //console.log("serv"+orderid)
    for (var i = 0; i < product.length; i++) {
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
  getSalesById: (orderid, companyid, callBack) => {
    let sql = `
    select a.CustomerOrderId, c.Fname ,a.Date,Sum(Quantity) as 'sum',a.Total  from Customer_OrderDetails as a 
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
      [orderid, companyid],

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
    let sql = `  
    select a.CustomerOrderId, c.Fname ,Date_format(a.Date,'%Y-%m-%d')as 'Date',sum(Quantity) as SumofQuantity,Total  from Customer_OrderDetails as a 
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
  },

  getMaxSoldsItems: (companyid, callBack) => {
    let sql = `   select  ProductId, count as Quantity from( SELECT  sop.ProductId, 
      count(ProductId) as count FROM IMS.Sales_Order_Products as
       sop inner join Customer_OrderDetails as cod 
    on sop.CustomerOrderId=cod.CustomerOrderId 
     inner join user_master_customer
     as cm on cod.CustomerId= cm.CustomerId 
     where cod.Date>=DATE_SUB(now(),INTERVAL 1 MONTH) 
     and cm.CompanyId=?  group by sop.ProductId 
     )   as TotalSoldProduct 
     group by  ProductId  order by Quantity desc limit 1 ;     
  `;
    pool.query(sql, [companyid], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getMinSoldsItems: (companyid, callBack) => {
    let sql = `select  ProductId, count as Quantity from( SELECT  sop.ProductId, 
      count(ProductId) as count FROM IMS.Sales_Order_Products as
       sop inner join Customer_OrderDetails as cod 
    on sop.CustomerOrderId=cod.CustomerOrderId 
     inner join user_master_customer
     as cm on cod.CustomerId= cm.CustomerId 
     where cod.Date>=DATE_SUB(now(),INTERVAL 1 MONTH) 
     and cm.CompanyId=?  group by sop.ProductId 
     )   as TotalSoldProduct 
     group by  ProductId  order by Quantity asc limit 1 ;`;
    pool.query(sql, [companyid], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  // Get Recenet Sales By this Week ----------------------------------------->
  getRecentSalesByWeek: (CompanyId, callBack) => {
    let sql = `Select Sales_Order_Products.CustomerOrderId , SUM(Sales_Order_Products.Quantity) as 'Total Unit' ,Customer_OrderDetails.Total as 'Total',user_master_customer.Fname  as 'customer'
    from Sales_Order_Products inner join Customer_OrderDetails on Sales_Order_Products.CustomerOrderId=Customer_OrderDetails.CustomerOrderId 
    inner join user_master_customer on Customer_OrderDetails.CustomerId=user_master_customer.CustomerId 
    where Customer_OrderDetails.Date>=DATE_SUB(now(),INTERVAL 1 week) AND Customer_OrderDetails.Status=1
    group by  Sales_Order_Products.CustomerOrderId;`;
    pool.query(sql, [CompanyId], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getSalesPerCategory: (companyid, callBack) => {
    let sql = `select c.Category_name as 'CategoryName' , sum(sop.Quantity) as 'Quantity_Per_Category',
     sum(sop.SubTotal) as 'Total' , 
    (sum(sop.SubTotal)-sum(sop.Quantity*p.PurchasePrice))/sum(sop.SubTotal) as 'Profit Margin' 
    from category as c 
    inner join product as p on c.CategoryId=p.CategoryId 
    inner join Sales_Order_Products as sop on p.ProductId=sop.ProductId inner join 
    Customer_OrderDetails as cod
    on sop.CustomerOrderId=cod.CustomerOrderId
     where c.CompanyId=? and  cod.Date>=DATE_SUB(now(),INTERVAL 1 MONTH)
     group by c.CategoryId`;
    pool.query(sql, [companyid], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  }
};
