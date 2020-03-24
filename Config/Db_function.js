const pool = require("./database");

module.exports = {
  Execute_Update: (sql, arrData, callBack) => {
    pool.query(
      sql,
      arrData,

      (error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  }
};
