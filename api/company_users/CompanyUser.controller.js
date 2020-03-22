const {
  getUserByUserEmail,
  createCompany_User,
  resetPassword
} = require("./CompanyUser.service");

//const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { sendMail } = require("../../Config/sendEmail");
module.exports = {
  // function to authenticate  company user by Email id and passoword
  // return respose with user information and Json Web Token if vaild user
  authcompanyuser: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: "0",
          message: "Internal server error"
        });
      }
      if (!results) {
        return res.status(404).json({
          success: "0",
          message: "Invalid email address"
        });
      }

      if (body.password === results.Password) {
        results.Password = undefined;
        let payload = { id: results.UserId };
        let token = sign(payload, process.env.JWT_KEY);

        return res.status(200).json({
          success: "1",
          message: "login successfully",
          token: token,
          data: results
        });
      } else {
        return res.status(401).json({
          success: "0",
          message: "Invalid email or password"
        });
      }
    });
  },

  //Function for Create Company User and Company Details ------------>
  createCompany: (req, res) => {
    createCompany_User(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error !",
          data: err
        });
      } else if (results[15][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      } else if (results[15][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[16][0]["Err_msg"]
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Company Profile created Successfully"
        });
      }
    });
  },

  //Function to provide Forget Password for  (Company ) user if valid email add------------------------------->
  // Send email for valid user with re-login details
  forgetPasswordCompany: (req, res) => {
    const body = req.body;

    resetPassword(body.email, (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: "0",
          data: "Internal Server error!"
        });
      }
      if (!results.length) {
        return res.status(404).json({
          success: "0",
          message: "Email Addess isn't exist"
        });
      } else {
        sendMail(results[0]["Email"], results[0]["Password"], (err, result) => {
          console.log(body.email);
          if (err) {
            return res.status(500).json({
              success: "0",
              message: "Unable to send e-mail. Please Contact the administrator"
            });
          }
          if (result) {
            return res.status(200).json({
              success: 1,
              message: "Email sent successfully! Please check your mailbox",
              data: result
            });
          }
        });
      }
    });
  }
};
