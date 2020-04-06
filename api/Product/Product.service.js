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
        req.file.filename,
        product.SupplierId,
        product.Barcode,
        product.Qty_minimum_required,
        product.CompanyId,
      ],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  // Service to get all product information
  getAllProduct: (CompanyId, callBack) => {
    pool.query(
      "SELECT `product`.`ProductId`,`product`.`Product_name` as `ProductName`,`product`.AvailableQty as `Inventory`,`product`.`SKU`,`product`.`Description`, `ca`.`Category_name` as category, `product`.`Image`,`product`.`SupplierId`,supplier.SupplierName FROM `IMS`.`product` as `product`  inner join category as ca on product.CategoryId = ca.CategoryId  inner join Suppliers as supplier  on  product.SupplierId= supplier.SupplierId where product.IsActive=1 and product.CompanyId= ? ",
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

  // Service to Delete Product by product id -------------------------------->
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
  },

  // Service to Get Product By Id ------------------------------->

  GetProductById: (CompanyId, ProductId, _callBack) => {
    pool.query(
      "SELECT `product`.`ProductId`,`product`.`Product_name` as `ProductName` ,`product`.`SKU`,`product`.`Description`,`product`.`PurchasePrice`,`product`.`RetailPrice`,`product`.`CategoryId`,`product`.`Country_Origin_id`,`product`.`Image`,`product`.`SupplierId`,`product`.`Barcode`,`product`.`Qty_minimum_required`,`product`.`CompanyId`,`product`.`AvailableQty`,`product`.`IsActive` FROM `IMS`.`product` where  `product`.`CompanyId`= ? and `product`.`ProductId`= ? ;",
      [CompanyId, ProductId],

      (error, results, fields) => {
        if (error) {
          return _callBack(error);
        }

        console.log(results);
        return _callBack(null, results);
      }
    );
  },

  //Service to  Edit Product ------------------------------------->
  EditProduct: (req, callBack) => {
    let image = "";
    if (typeof req.file == "undefined") {
      image = null;
    } else {
      image = req.file.filename;
    }

    let product = req.body;
    let sql = `SET @ProductId=?;SET @ProductName=?;SET @Description=?;SET @PurchasePrice=?;SET @RetailPrice=?;SET @CategoryId=?;SET @Country_Origin_id=?;SET @Image=?;SET @SupplierId=?; SET @QtyMinRequired=?;SET @CompanyId =?;CALL EditProduct(@ProductId,@ProductName,@Description,@PurchasePrice,@RetailPrice,@CategoryId,@Country_Origin_id,@Image,@SupplierId,@QtyMinRequired,@CompanyId,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [
        product.ProductId,
        product.ProductName,
        product.Description,
        product.PurchasePrice,
        product.RetailPrice,
        product.CategoryId,
        product.Country_Origin_id,
        image,
        product.SupplierId,
        product.QtyMinRequired,
        product.CompanyId,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      }
    );
  },
  getFeatureProduct: (companyId, callBack) => {
    let sql = `set @company_id=?;call FeatureProduct(@company_id)`;
    pool.query(sql, [companyId], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      //console.log(results);
      return callBack(null, results);
    });
  },
  valuation: (companyid, callBack) => {
    let sql = `select Sum(RetailPrice*AvailableQty) as 'sum' from product where CompanyId=?`;
    pool.query(sql, [companyid], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      //console.log(results);
      return callBack(null, results);
    });
  },
  articles: (companyid, callBack) => {
    let sql = `select Sum(AvailableQty) as 'sum' from product where CompanyId=?`;
    pool.query(sql, [companyid], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      //console.log(results);
      return callBack(null, results);
    });
  },

  // Current Incoming Products ---------------------------------------------------------->
  incoming_products: (CompanyId, callBack) => {
    let sql = `select sum(Purchase_Order_Products.Quantity) as 'Total Unit' from Purchase_Order_Products inner join Purchase_orders on Purchase_Order_Products.Purchase_OrderId=Purchase_orders.Purchase_OrderId inner join Suppliers on Purchase_orders.SupplierId =Suppliers.SupplierId where Suppliers.CompanyId=? AND Purchase_orders.Status=1;`;
    pool.query(sql, [CompanyId], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
};
