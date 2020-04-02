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
  //edit usser
  editUser: (req, callBack) => {
    //console.log("hi")
    // console.log(req);
    let user = req.body;
    //let user = req.body;
    let sql = `SET @Customerid=?; SET @Fname=?;SET @Lname=?;SET @Email=?;SET @PhoneNumber=?;SET @Password=?;  CALL EditCompanyUserProfile(@Customerid,@Fname,@Lname,@Email,@PhoneNumber,@Password,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [
        user.userid,
        user.fname,
        user.lname,
        user.email,
        user.phonenumber,
        user.password
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
      [userid],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        // console.log(results);
        return callBack(null, results);
      }
    );
  },
  // Service to Get Company Details By Id ------------------------------->

  getCompanyById: (CompanyId, _callBack) => {
    pool.query(
      "Select * from company_details where CompanyId=?;",
      [CompanyId],

      (error, results, fields) => {
        if (error) {
          return _callBack(error);
        }

        console.log(results);
        return _callBack(null, results);
      }
    );
  },

  // Servide to Edit Company Profile ----------------------------------->

  EditCompanyProfile: (req, _callBack) => {
    let logo = "";
    if (typeof req.file == "undefined") {
      logo = null;
    } else {
      logo = req.file.filename;
    }
    let company = req.body;
    let sql = `SET @CompanyId=?;SET @CompanyName=?;SET @Website=?;SET @Logo=?;SET @Address1=?;SET @Address2=?;SET @City=?;SET @CountryId=?;SET @ProvinceId=?; SET @PostalCode=?;SET @CurrencyId=?;CALL EditCompanyProfile(@CompanyId,@CompanyName,@Website,@Logo,@Address1,@Address2,@City,@CountryId,@ProvinceId,@PostalCode,@CurrencyId,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;

    pool.query(
      sql,
      [
        company.CompanyId,
        company.CompanyName,
        company.Website,
        logo,
        company.Address1,
        company.Address2,
        company.City,
        company.CountryId,
        company.ProvinceId,
        company.PostalCode,
        company.CurrencyId
      ],
      (error, results, fields) => {
        if (error) {
          return _callBack(error);
        }

        console.log(results);
        return _callBack(null, results);
      }
    );
  }
};
