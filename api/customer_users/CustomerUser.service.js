const pool = require("../../Config/database");

module.exports = {
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from IMS.user_master_customer where Email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  }
};
