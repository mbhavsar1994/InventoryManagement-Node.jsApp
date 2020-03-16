const pool = require("../../Config/database");

module.exports = {
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
