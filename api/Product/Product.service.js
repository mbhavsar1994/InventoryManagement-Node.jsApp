const pool = require("../../Config/database");

module.exports = {
  // Insert Product Details ---------------------------->

  AddProduct: (req, callBack) => {
    let product = req.body;
    let sql = `SET @ProductName=?;SET @SKU=?;SET @Description=?;SET @PurchasePrice=?;SET @RetailPrice=?;SET @CategoryId=?;SET @CountryId=?;SET @Image=?; SET @SupplierId=?;SET @Barcode=?;SET @QtyMimRequired=?;SET @CompanyId=?;CALL AddProduct(@ProductName,@SKU,@Description,@PurchasePrice,@RetailPrice,@CategoryId,@CountryId,@Image,@SupplierId,@Barcode,@QtyMimRequired,@CompanyId,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [
        product.Product_name,
        product.SKU,
        product.Description,
        product.PurchasePrice,
        product.RetailPrice,
        product.CategoryId,
        product.Country_Origin_id,
        product.Image,
        product.SupplierId,
        product.Barcode,
        product.Qty_minimum_required,
        product.CompanyId
      ],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  getAllProduct: (CompanyId, callBack) => {
    pool.query(
      "SELECT `product`.`ProductId`,`product`.`Product_name` ,`product`.`SKU`,`product`.`Description`, `ca`.`Category_name` as category, `product`.`Image`,supplier.SupplierName FROM `IMS`.`product` as `product`  inner join category as ca on product.CategoryId = ca.CategoryId  inner join Suppliers as supplier  on  product.SupplierId= supplier.SupplierId where product.CompanyId= ?;",
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

  RemoveProduct: (req, callBack) => {
    pool.query(
      "UPDATE product SET IsActive=0 WHERE ProductId=?;",
      [req.body.ProductId],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        console.log(results);
        return callBack(null, results.changedRows);
      }
    );
  }
};
