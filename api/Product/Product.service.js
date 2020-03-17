const pool = require("../../Config/database");

module.exports = {
  AddProduct: (req, callback) => {},

  getAllProduct: (CompanyId, callBack) => {
    pool.query(
      "SELECT `product`.`ProductId`,`product`.`Product_name` ,`product`.`SKU`,`product`.`Description`, `ca`.`Category_name` as category, `product`.`Image`,supplier.SupplierName FROM `IMS`.`product` as `product`  inner join category as ca on product.CategoryId = ca.CategoryId  inner join Suppliers as supplier  on  product.SupplierId= supplier.SupplierId where product.CompanyId= ?;",
      [CompanyId],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  }
};
