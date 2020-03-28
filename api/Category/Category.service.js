const pool = require("../../Config/database");

module.exports = {
  // service to create category ----
  create_Category: (req, callBack) => {
    let category = req.body;
    console.log(category.companyid);
    let sql = `SET @categoryname=?;SET @SKU=?;SET @tags=?;SET @companyid=?;  CALL AddCategory(@categoryname,@SKU,@tags,@companyid,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;
    pool.query(
      sql,
      [category.categoryname, category.SKU, category.tags, category.companyid],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  // service to get all category by company id
  getAllCategory: (CompanyId, callBack) => {
    pool.query(
      "SELECT `category`.`CategoryId`,`category`.`Category_name` as categoryname ,`category`.`SKU`,`category`.`tags`FROM `IMS`.`category` where  `category`.`CompanyId`=?;",
      [CompanyId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results);
      }
    );
  },

  // service to edit company infromation
  EditCategory: (req, callBack) => {
    let category = req.body;

    let sql = `SET @categoryId=?; SET @categoryname=?;SET @SKU=?;SET @tags=?;  CALL EditCategory(@categoryId,@categoryname,@SKU,@tags,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;
    pool.query(
      sql,
      [category.categoryId, category.categoryname, category.SKU, category.tags],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  // service to get category details by company id and category id
  GetCategoryById: (CompanyId, CategoryId, callBack) => {
    pool.query(
      "SELECT `category`.`CategoryId`,`category`.`Category_name` as categoryname,`category`.`SKU`,`category`.`tags`FROM `IMS`.`category` where  `category`.`CompanyId`=? and `category`.`CategoryId`=? ;",
      [CompanyId, CategoryId],

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
