const pool = require("../../Config/database");
const { Execute_Update } = require("../../Config/Db_function");
module.exports = {
  // Service to  Add new Purchase Order
  AddPurchaseOrder: (req, callBack) => {
    let Purchase_order = req.body;
    let sql = `SET @SupplierId=?;SET @CurrencyId=?;SET @DiscountRate=?; set @PurchaseOrderTotal=? ; CALL CreatePurchaseOrder(@SupplierId,@CurrencyId,@DiscountRate,@PurchaseOrderTotal,@status,@Err_msg,@purchase_ord_id,@delivery_id);select @status as status; select @Err_msg as Err_msg;select @purchase_ord_id as purchase_ord_id; select @delivery_id as delivery_id`;

    pool.query(
      sql,
      [
        Purchase_order.SupplierId,
        Purchase_order.CurrencyId,
        Purchase_order.DiscountRate,
        Purchase_order.PurchaseOrderTotal
      ],

      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  // Service to Add new Purchase Order Products
  AddPurchaseOrder_Products: (
    req,
    _Purchase_OrderId,
    _delivery_id,
    callBack
  ) => {
    let product_jason = req.body.products;
    var products = [];
    var Delivery_Products = [];
    for (var i = 0; i < product_jason.length; i++) {
      products.push([
        _Purchase_OrderId,
        product_jason[i].ProductId,
        product_jason[i].Price,
        product_jason[i].Quantity,
        product_jason[i].Total
      ]);

      Delivery_Products.push([
        _delivery_id,
        product_jason[i].ProductId,
        product_jason[i].Price,
        product_jason[i].Quantity,
        product_jason[i].Total
      ]);
    }

    let sql = `

    Drop table if exists Temp_Puch_ord_Prod ;
    CREATE TEMPORARY TABLE Temp_Puch_ord_Prod(
      Purchase_OrderId INT,
      ProductId INT,
      Price float,
      Quantity INT ,
      Total double,
      isProcessed bit Default 0
    );

    insert into Temp_Puch_ord_Prod (Purchase_OrderId,ProductId,Price,Quantity,Total) VALUES ? ;

    Drop table if exists Temp_Deli_ord_Prod ;
    CREATE TEMPORARY TABLE Temp_Deli_ord_Prod(
      DeliveryId INT,
      ProductId INT,
      Price float,
      Quantity INT ,
      Total double
    );

    
    insert into Temp_Deli_ord_Prod (DeliveryId,ProductId,Price,Quantity,Total) VALUES ? ;

    CALL AddPurchaseProducts(@status,@Err_msg);
    select @status as status; 
    select @Err_msg as Err_msg;
  `;

    pool.query(
      sql,
      [products, Delivery_Products],

      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  // Edit Purchase Order --------------------->
  EditPurchaseOrder: (req, callBack) => {
    let Purchase_order = req.body;
    let sql = `SET @purchase_ord_id=?;SET @SupplierId=?;SET @PurchaseOrderTotal=? ; CALL EditPurchaseOrder(@purchase_ord_id,@SupplierId,@PurchaseOrderTotal,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [
        Purchase_order.purchase_ord_id,
        Purchase_order.SupplierId,
        Purchase_order.PurchaseOrderTotal
      ],

      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  // Edit Purchase Order ------------------------>

  EditPurchaseOrder_Products1: (req, callBack) => {
    let product_jason = req.body.products;
    let purchase_ord_id = req.body.purchase_ord_id;
    var products = [];
    var delivery_products = [];

    for (var i = 0; i < product_jason.length; i++) {
      products.push([
        product_jason[i].ProductId,
        product_jason[i].Quantity,
        product_jason[i].Total,
        product_jason[i].PurchaseOrder_ProductId
      ]);

      delivery_products.push([
        purchase_ord_id,
        product_jason[i].ProductId,
        product_jason[i].Quantity,
        product_jason[i].Total
      ]);
    }
    let sql = `

    Drop table if exists Temp_Puch_ord_Prod ;
    CREATE TEMPORARY TABLE Temp_Puch_ord_Prod(
      ProductId INT,
      Quantity INT ,
      Total double,
      PurchaseOrder_ProductId INT,
      isProcessed bit Default 0
    );

    insert into Temp_Puch_ord_Prod (ProductId,Quantity,Total,PurchaseOrder_ProductId) VALUES ? ;

    Drop table if exists Temp_Deli_ord_Prod ;
    CREATE TEMPORARY TABLE Temp_Deli_ord_Prod(
      DeliveryId INT,
      ProductId INT,
      Quantity INT ,
      Total double
    );

    
    insert into Temp_Deli_ord_Prod (DeliveryId,ProductId,Quantity,Total) VALUES ? ;
    set @purchase_ord_id=?;
    CALL EditPurchaseProdcuts(@purchase_ord_id,@status,@Err_msg);
    select @status as status; 
    select @Err_msg as Err_msg;
  `;

    pool.query(
      sql,
      [products, delivery_products, purchase_ord_id],

      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        } else {
        }

        return callBack(null, results);
      }
    );
  },

  // Cancel Purchase Order ------------------------------------------------------------>

  Cancelpurchase_Order: (req, callBack) => {
    pool.query(
      "UPDATE Purchase_orders SET Status='Cancelled' WHERE Purchase_OrderId=?;",
      [req.body.Purchase_OrderId],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        console.log(results);
        return callBack(null, results);
      }
    );
  },

  // Service to get all purchase orders information
  getAllPurchaseOrders: (CompanyId, callBack) => {
    pool.query(
      "select a.Purchase_OrderId,a.SupplierId,a.Date,a.Status,b.SupplierName,b.CompanyId,Sum(c.Quantity) as 'Quantity',Sum(c.Total) as  'Total' from Purchase_orders as a inner join Suppliers as b on a.SupplierId=b.SupplierId inner join Purchase_Order_Products as c on c.Purchase_OrderId=a.Purchase_OrderId  where b.CompanyId=? and a.IsActive=1 group by c.Purchase_OrderId",
      [CompanyId],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        console.log(results);
        return callBack(null, results);
      }
    );
  },

  getIncomingPurchaseOrder_report: (companyid, callBack) => {
    let sql = `select pop.Purchase_OrderId, su.SupplierName as 'Supplier',Date,
     sum(pop.Quantity) as 'Total_Unit'
    ,Purchase_order_Totat_IncTax as Total
     from Purchase_orders as po  inner join Purchase_Order_Products as pop
    on po.Purchase_OrderId=pop.Purchase_OrderId inner join Suppliers as su
     on po.SupplierId= su.SupplierId
     where po.Status=1 and po.IsActive=1 and po.Date>=DATE_SUB(now(),INTERVAL 1 MONTH) and su.CompanyId=?
     group by pop.Purchase_OrderId `;
    pool.query(sql, [companyid], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  // Service to get  Purchase order by id
  getPurchase_OrderbyId: (CompanyId, PurchaseOrderId, callBack) => {
    pool.query(
      `
      select a.Purchase_OrderId,a.SupplierId,a.Date,a.Status,b.SupplierName,b.DiscountRate,cm.Currency_Code,a.Purchase_order_Total from 
      Purchase_orders as a inner join Suppliers as b 
      on a.SupplierId=b.SupplierId inner join Purchase_Order_Products
      as c on c.Purchase_OrderId=a.Purchase_OrderId  inner join company_details as cd on b.CompanyId= cd.CompanyId 
      inner join Currency_master as cm on cd.CurrencyId=cm.CurrencyId
       where b.CompanyId=? and a.Purchase_OrderId=? and a.IsActive=1 group by c.Purchase_OrderId;
       
      select p.ProductId, p.SKU,p.Product_name,p.Description,p.PurchasePrice,pop.PurchaseOrder_ProductId,pop.Quantity,pop.Total from product as p inner join
      Purchase_Order_Products  as pop
      on p.ProductId= pop.ProductId  where pop.Purchase_OrderId=?
      `,
      [CompanyId, PurchaseOrderId, PurchaseOrderId],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);

        return callBack(null, results);
      }
    );
  },
  //Disable Purchase Order by id
  disablePurchaseOrder: (purchase_orderId, callBack) => {
    pool.query(
      "UPDATE Purchase_orders SET IsActive=0 WHERE Purchase_OrderId=?;",
      [purchase_orderId],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        console.log(results);
        return callBack(null, results);
      }
    );
  }
};
