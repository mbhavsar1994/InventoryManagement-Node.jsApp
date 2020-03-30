const pool = require("../../Config/database");

module.exports = {
  //Get Company User Details by Email_id----
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
        req.file.filename,
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
      `SELECT Email,Password FROM IMS.user_master_company where Email=?`,
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
  // Get Company User details by User id---
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
  },
  editUser: (req, callBack) => {
    //console.log("hi")
   // console.log(req);
    let user=req.body;
    pool.query(
      `SET @status=1;Update IMS.user_master_company SET Fname=?,Lname=?,Email=?,Password=?,PhoneNumber=? where UserId=?;select @status;`,
      [
        user.fname,
        user.lname,
        user.email,
        user.password,
        user.phonenumber,
        user.userid
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
       // console.log(results);
        return callBack(null, results);
      }
    );
  },
  //get user by id
  getUserById: (userid, callBack) => {
   // let user=req.body;
    pool.query(
      `select * from IMS.user_master_company where UserId=? `,
      [
        userid
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
       // console.log(results);
        return callBack(null, results);
      }
    );
  }
};
