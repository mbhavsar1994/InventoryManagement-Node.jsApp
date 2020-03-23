const pool = require("../../Config/database");

module.exports = {
  AddPurchaseOrder: (req, callBack) => {
    let Purchase_order = req.body;
    let sql = `SET @SupplierId=?;SET @CurrencyId=?;SET @DiscountRate=?; set @PurchaseOrderTotal=? ; CALL CreatePurchaseOrder(@SupplierId,@CurrencyId,@DiscountRate,@PurchaseOrderTotal,@status,@Err_msg,@purchase_ord_id);select @status as status; select @Err_msg as Err_msg;select @purchase_ord_id as purchase_ord_id`;

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

  AddPurchaseOrder_Products: (req, _Purchase_OrderId, callBack) => {
    let product_jason = req.body.products;
    var products = [];

    for (var i = 0; i < product_jason.length; i++)
      products.push([
        _Purchase_OrderId,
        product_jason[i].ProductId,
        product_jason[i].Price,
        product_jason[i].Quantity,
        product_jason[i].Total
      ]);

    let sql = `INSERT INTO Purchase_Order_Products (Purchase_OrderId, ProductId,Price,Quantity,Total) VALUES ? `;

    pool.query(
      sql,
      [products],

      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  }
};
