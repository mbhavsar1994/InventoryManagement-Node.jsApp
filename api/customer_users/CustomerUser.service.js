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
<<<<<<< HEAD
=======
  },
  //create customer
  createCustomer: (req, callBack) => {
    let user = req.body;
    let sql = `SET @Fname=?;SET @Lname=?;SET @Email=?;SET @PhoneNumber=?;SET @CountryID=?;SET @ProviceId=?;  SET @city = ?;SET @PostalCode =? ; SET @Address=? ;SET @Password=?; SET @CompanyId=?; CALL createuser(@Fname,@Lname,@Email,@PhoneNumber,@CountryID,@ProvinceId,@city,@PostalCode,@Address,@Password,@ComapanyId,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;
    pool.query(
      sql,
      [
        user.Fname,
        user.Lname,
        user.email,
        user.phonenumber,
        user.countryid,
        user.provinceid,
        user.city,
        user.postal,
        user.address,
        user.password,
        user.companyid
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        //console.log(results);
        return callBack(null, results);
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
>>>>>>> 01011e1d66f73ff5638b04d1ef2ed63389334542
  }
};
