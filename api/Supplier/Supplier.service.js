const pool = require("../../Config/database");

module.exports = {
  getAllSupplier: (CompanyId, callBack) => {
    pool.query(
      "SELECT `Suppliers`.`SupplierId`, `Suppliers`.`SupplierName`,`Suppliers`.`SupplierEmail`,`Suppliers`.`City`, `Suppliers`.`CountryId`, cm.name as CountryName FROM `IMS`.`Suppliers`  inner join country_master as cm on `IMS`.`Suppliers`.CountryId = cm.CountryId  where CompanyId= ?",
      [CompanyId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results);
      }
    );
  }
};
