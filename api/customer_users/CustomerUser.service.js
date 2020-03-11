const pool = require("../../Config/database");

module.exports = {
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select mc.CustomerId, mc.Fname,mc.Email,mc.Password,cd.CompanyId,cd.Company_name,cd.Logo from IMS.user_master_customer  mc  inner join company_details cd on mc.CompanyId=cd.CompanyId   where mc.Email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  // Forget Password for Customer ----------------->
  resetPassword: (email, callBack) => {
    pool.query(
      `SELECT Email,Password FROM IMS.user_master_customer where Email=?`,
      [email],
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
