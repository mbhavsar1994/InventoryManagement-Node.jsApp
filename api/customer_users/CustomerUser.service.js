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
  },
  createcustomer_User : (req, callBack) =>{
    let user = req.body;
    let sql = `SET @Fname=?;SET @Lname=?;SET @Email=?;SET @PhoneNumber=?;SET @CountryID=?;SET @ProvinceId=?;SET @city =?; SET @PostalCode =?;SET @Address=? ;set @company_id=1 ;SET @Password=? ;
    CALL createuser(@Fname,@Lname,@Email,@PhoneNumber,@CountryID,@ProvinceId,@city,@PostalCode,@Address,@company_id,@Password,@status,@Err_msg);
    select @status as status1;
     select @Err_msg as Err_msg1;`;
    pool.query(
      sql,
      [
        user.fname,
        user.lname,
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
       
       // console.log(results)
        if (error) {
          return callBack(error);
        }
       // console.log();
        return callBack(null, results[13][0].Err_msg1);
      }
    );
  }
};
