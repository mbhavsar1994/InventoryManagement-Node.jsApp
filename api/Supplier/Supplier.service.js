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
  },
  //Get All supplier Details
  getAllSupplier: (CompanyId, callBack) => {
    pool.query(
      "SELECT `Suppliers`.`SupplierId`, `Suppliers`.`SupplierName`,`Suppliers`.`SupplierEmail`,`Suppliers`.`City`, `Suppliers`.`CountryId`, cm.name as CountryName FROM `IMS`.`Suppliers`  inner join country_master as cm on `IMS`.`Suppliers`.CountryId = cm.CountryId  where CompanyId= ?",
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

  //Edit Supplier Deatils

  EditSupplier: (req, callBack) => {
    let supplier = req.body;
    let sql = `SET @SupplierId=?;SET @SupplierName=?;SET @SupplierEmail=?;SET @SupplierPhone=?;SET @DiscountRate=?;SET @CountryId=?;SET @ProvinceId=?;SET @City=?;SET @Address1=?; SET @Address2=?;SET @PostalCode =?;SET @CompanyId=?;CALL EditSupplier(@SupplierId,@SupplierName,@SupplierEmail,@SupplierPhone,@DiscountRate,@CountryId,@ProvinceId,@City,@Address1,@Address2,@PostalCode,@CompanyId,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [
        supplier.SupplierId,
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
  },

  //Service to get supplier details by id
  GetSupplierById: (CompanyId, SupplierId, callBack) => {
    pool.query(
      `SELECT Suppliers.SupplierId,Suppliers.SupplierName,Suppliers.SupplierEmail,Suppliers.SupplierPhone,
      Suppliers.DiscountRate,Suppliers.CountryId,
      Suppliers.ProvinceId,Suppliers.City,Suppliers.Address1,Suppliers.Address2,Suppliers.PostalCode , cm.Currency_Code
      FROM IMS.Suppliers as Suppliers inner join company_details as cd 
      on Suppliers.CompanyId= cd.CompanyId inner join Currency_master as cm on cd.CurrencyId= cm.CurrencyId where  Suppliers.CompanyId= ? and 
      Suppliers.SupplierId= ?`,
      [CompanyId, SupplierId],

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
