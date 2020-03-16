const pool = require("../../Config/database");

module.exports = {
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select mc.UserId, mc.Fname,mc.Email, mc.Password, mc.PhoneNumber,cu.CompanyId,cu.IsAdmin,cd.Company_name, cd.Logo from IMS.user_master_company  mc  inner join  IMS.Company_users as cu on mc.UserId=cu.UserId inner join company_details cd on cu.CompanyId=cd.CompanyId   where mc.Email =?;`,
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
  // Insert Company and User Details ------------------------------->
  createCompany_User: (req, callBack) => {
    let user = req.body;
    let sql = `SET @Fname=?;SET @Lname=?;SET @Email=?;SET @Password=?;SET @PhoneNumber=?;SET @Company_name=?;SET @website=?;SET @logo=?;SET @Address1=? ; SET @Address2=?;SET @city = ?;SET @CountryID=?;SET @ProviceId=?;SET @PostalCode =? ;CALL CompanyUserMasterAdd(@Fname,@Lname,@Email,@Password,@PhoneNumber,@Company_name,@website,@logo,@Address1,@Address2,@city,@CountryID,@ProvinceId,@PostalCode,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [
        user.Fname,
        user.Lname,
        user.Email,
        user.Password,
        user.PhoneNumber,
        user.CompanyName,
        user.Website,
        user.Logo,
        user.Address1,
        user.Address2,
        user.City,
        user.CountryId,
        user.ProvinceId,
        user.PostalCode
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      }
    );
  },
  // Forget Password for Company ----------------->
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
  },

  getUserByid: (id, callBack) => {
    pool.query(
      `SELECT * FROM IMS.user_master_company where UserId=?`,
      [id],
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
