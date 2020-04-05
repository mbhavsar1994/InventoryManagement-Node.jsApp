const pool = require("../../Config/database");

module.exports = {
  // service to update receviced delivery
  receiveDelivery: (req, callBack) => {
    let receive_Delivery = req.body;
    let sql = `SET @PurchaseorderId=?;CALL ReceiveDelivery_updateInventory(@PurchaseorderId,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [receive_Delivery.PurchaseOrderId],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  // Service to get all delivery
  getAllDeliverydetails: (CompanyId, callBack) => {
    pool.query(
      "SELECT `Delivery_Order_Products`.`DeliveryId`, sum(  `Delivery_Order_Products`.`Quantity`) as 'TotalUnit', Delivery_Order_Products.DeliveryDate ,Suppliers.SupplierName,`Purchase_orders`.`Purchase_order_Totat_IncTax` as Total, `Delivery`.`Status` FROM `IMS`.`Delivery`  inner join  `IMS`.`Delivery_Order_Products` on `IMS`.`Delivery`.DeliveryId= `IMS`.`Delivery_Order_Products`.DeliveryId inner join Purchase_orders on Delivery.Purchase_OrderId=Purchase_orders.Purchase_OrderId inner join Suppliers on  Purchase_orders.SupplierId=Suppliers.SupplierId  where Suppliers.CompanyId=?   group by Delivery_Order_Products.DeliveryId,Delivery_Order_Products.DeliveryDate;",
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

  // Service to get  delivery by id
  getDeliverybyId: (DeliveryId, callBack) => {
    pool.query(
      `
SELECT Delivery_Order_Products.DeliveryId, Delivery_Order_Products.DeliveryDate, Delivery.Status,
Delivery.Purchase_OrderId FROM IMS.Delivery inner join  IMS.Delivery_Order_Products
on IMS.Delivery.DeliveryId= IMS.Delivery_Order_Products.DeliveryId inner join Purchase_orders on 
Delivery.Purchase_OrderId=Purchase_orders.Purchase_OrderId where Delivery_Order_Products.DeliveryId=?
group by Delivery_Order_Products.DeliveryId,Delivery_Order_Products.DeliveryDate;

select p.SKU,p.Product_name,p.Description,p.PurchasePrice,dop.Quantity,dop.Total from product as p inner join
 Delivery_Order_Products as dop
on p.ProductId= dop.ProductId  where dop.DeliveryId=?;
      `,
      [DeliveryId, DeliveryId],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);

        return callBack(null, results);
      }
    );
  },
};
