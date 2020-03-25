const pool = require("../../Config/database");

module.exports = {
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
  getAllDeliverydetails: (CompanyId, callBack) => {
    pool.query(
      "SELECT `Delivery_Order_Products`.`DeliveryId`, sum(  `Delivery_Order_Products`.`Quantity`) as 'Total Unit', Delivery_Order_Products.DeliveryDate ,Suppliers.SupplierName,`Purchase_orders`.`Purchase_order_Totat_IncTax` as Total, `Delivery`.`Status` FROM `IMS`.`Delivery`  inner join  `IMS`.`Delivery_Order_Products` on `IMS`.`Delivery`.DeliveryId= `IMS`.`Delivery_Order_Products`.DeliveryId inner join Purchase_orders on Delivery.Purchase_OrderId=Purchase_orders.Purchase_OrderId inner join Suppliers on  Purchase_orders.SupplierId=Suppliers.SupplierId   group by Delivery_Order_Products.DeliveryId,Delivery_Order_Products.DeliveryDate;",
      [CompanyId],

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
