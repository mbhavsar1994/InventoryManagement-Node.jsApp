const pool = require("../../Config/database");

module.exports = {
  getAllCategory: (CompanyId, callBack) => {
    pool.query(
      "SELECT `category`.`CategoryId`,`category`.`Category_name`,`category`.`SKU`,`category`.`tags`FROM `IMS`.`category` where  `category`.`CompanyId`=?;",
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
