const pool = require("../../Config/database");

module.exports = {
  //geting countries
  getcountry: (req, callBack) => {
    pool.query("SELECT * FROM IMS.country_master;", (error, results) => {
      if (error) {
        return callBack(error);
      }
      //console.log(results);
      return callBack(null, results);
    });
  },
  //fetching provinces
  getProvince: (country_id, callBack) => {
    pool.query(
      "SELECT * FROM IMS.province_master where CountryId=?;",
      [country_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getProvinceName: (country_name, callBack) => {
    pool.query(
      "SELECT a.ProvinceId,a.name as Province_name ,b.name as country_name FROM IMS.province_master as a join  country_master as b on a.CountryId=b.CountryId where b.name=?",
      [country_name],
      (error, results) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  }
};
