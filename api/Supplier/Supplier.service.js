const pool = require("../../Config/database");

module.exports = {
<<<<<<< HEAD
  // Insert Supplier Details ------------------------------->
  CreateNewSupplier: (req, callBack) => {
    let supplier = req.body;
    let sql = `SET @SupplierName=?;SET @SupplierEmail=?;SET @SupplierPhone=?;SET @DiscountRate=?;SET @CountryId=?;SET @ProvinceId=?;SET @City=?;SET @Address1=?; SET @Address2=?;SET @PostalCode =?;SET @CompanyId=?;CALL AddSupplier(@SupplierName,@SupplierEmail,@SupplierPhone,@DiscountRate,@CountryId,@ProvinceId,@City,@Address1,@Address2,@PostalCode,@CompanyId,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [
        supplier.SupplierName,
        supplier.SupplierEmail,
        supplier.SupplierPhone,
        supplier.DiscountRate,
        supplier.CountryId,
        supplier.ProvinceId,
        supplier.City,
        supplier.Address1,
        supplier.Address2,
        supplier.PostalCode,
        supplier.CompanyId
      ],
=======
  getAllSupplier: (CompanyId, callBack) => {
    pool.query(
      "SELECT `Suppliers`.`SupplierId`, `Suppliers`.`SupplierName`,`Suppliers`.`SupplierEmail`,`Suppliers`.`City`, `Suppliers`.`CountryId`, cm.name as CountryName FROM `IMS`.`Suppliers`  inner join country_master as cm on `IMS`.`Suppliers`.CountryId = cm.CountryId  where CompanyId= ?",
      [CompanyId],
>>>>>>> e1c708ae8e597d3acef3c4bb764c9ed17a1b88d4
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
<<<<<<< HEAD
        console.log(results);
=======
        console.log(results[0]);
>>>>>>> e1c708ae8e597d3acef3c4bb764c9ed17a1b88d4
        return callBack(null, results);
      }
    );
  }
};
