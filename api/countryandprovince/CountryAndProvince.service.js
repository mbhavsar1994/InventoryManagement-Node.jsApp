const pool = require("../../Config/database");

module.exports = {
  getcountry: (req, callBack) => {
   
    pool.query(
      "SELECT * FROM IMS.country_master;",
      (error, results) => {
       
        if (error) {
          
          return callBack(error);
        }
        //console.log(results);
        return callBack(req,results);
      }
    );
  }
};
