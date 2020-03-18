const pool = require("../../Config/database");

module.exports = {
  create_Category: (req,callBack)=>{
    let category = req.body;
  
    let sql = `SET @categoryname=?;SET @SKU=?;SET @tags=?;SET @comapnyid=?;  CALL AddCategory(@categoryname,@SKU,@tags,@companyid,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;
    pool.query(sql,
      [
        category.categoryname,
        category.SKU,
        category.tags,
        category.CompanyId
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        
        return callBack(null, results);
      }
    );
  },
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
