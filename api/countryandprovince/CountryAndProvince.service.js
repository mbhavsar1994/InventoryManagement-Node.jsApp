const pool = require("../../Config/database");

module.exports = {
  //geting countries
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
  },
  //geting provinces
  getProvince: (country_id, callBack) => {
    pool.query("SELECT * FROM IMS.province_master where CountryId=?;"
    ,[country_id],(error, results) => {
       
      if (error) {
        
        return callBack(error);
      }
      //console.log(results);
      return callBack(country_id,results);
    });
  }
};
