var dns = require("dns");
var validator = require("email-validator");
const {
  getUserByUserEmail,
  createCompany_User,
  resetPassword,
  editUser,
  getUserById,
  getCompanyById,
  EditCompanyProfile,
} = require("./CompanyUser.service");
const _ = require("lodash");

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
          message: "Internal server error",
        });
      }
      if (!results) {
        return res.status(404).json({
          success: "0",
          message: "Invalid email address",
        });
      }

      if (body.password === results.Password) {
        results.Password = undefined;
        let payload = { email: results.Email };
        let token = sign(payload, process.env.JWT_KEY);
        results.Logo =
          "https://api-tradego.herokuapp.com/uploads/" + results.Logo;
        return res.status(200).json({
          success: "1",
          message: "login successfully",
          token: token,
          data: results,
        });
      } else {
        return res.status(401).json({
          success: "0",
          message: "Invalid email or password",
        });
      }
    });
  },

  //Function for Create Company User and Company Details ------------>
  createCompany: (req, res) => {
    req.file.filename;

    if (typeof req.file.filename == "undefined") {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Logo is missing!",
      });
    }
    if (!validator.validate(req.body.Email)) {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Enter valid email address!",
      });
    }
    createCompany_User(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error !",
          data: err,
        });
      } else if (results[15][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else if (results[15][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[16][0]["Err_msg"],
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Company Profile created Successfully",
        });
      }
    });
  },

  //Function to provide Forget Password for  (Company ) user if valid email add------------------------------->
  // Send email for validp user with re-login details
  forgetPasswordCompany: (req, res) => {
    const body = req.body;

    resetPassword(body.email, (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: "0",
          data: "Internal Server error!",
        });
      }
      if (!results.length) {
        return res.status(404).json({
          success: "0",
          message: "Email Addess isn't exist",
        });
      } else {
        sendMail(results[0]["Email"], results[0]["Password"], (err, result) => {
          console.log(body.email);
          if (err) {
            return res.status(500).json({
              success: "0",
              message:
                "Unable to send e-mail. Please Contact the administrator",
            });
          }
          if (result) {
            return res.status(200).json({
              success: 1,
              message: "Email sent successfully! Please check your mailbox",
              data: result,
            });
          }
        });
      }
    });
  },
  //update company customer
  editcompanyuser: (req, res) => {
    var regex = /\S+@\S+\.\S+/;
    if (req.body.email == null) {
      return res.status(400).json({
        success: "0",
        message: "email is require",
      });
    } else if (req.body.email == req.body.email.match(regex)) {
      editUser(req, (err, results) => {
        console.log(results);
        if (err) {
          return res.status(500).json({
            success: "0",
            data: "Internal Server error!",
          });
        } else if (!results.length) {
          return res.status(500).json({
            success: "0",
            data: "Internal Server error!",
          });
        } else if (results[7][0]["status"] == 0) {
          return res.status(400).json({
            success: "0",
            message: results[8][0]["Err_msg"],
          });
        } else {
          return res.status(200).json({
            success: "1",
            message: "Update Sucessfully!",
          });
        }
      });
    } else {
      return res.status(400).json({
        success: "0",
        message: "email  should be in example@gmail.com",
      });
    }
  },
  //get user by id
  getUserDetailsById: (req, res) => {
    let userid = 0;
    if (req.query.userid == undefined) {
      return res.status(400).json({
        success: "0",
        message: "user id needed!",
      });
    } else {
      userid = req.query.userid;
      console.log(userid);
      getUserById(userid, (err, results) => {
        console.log(results[0]);
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: "0",
            message: "Internal Server Error",
            error: err,
          });
        }
        if (!results.length) {
          return res
            .status(404)
            .json({ success: "0", message: " Resource does not exist." });
        } else {
          return res.status(200).json({
            success: "1",
            data: results,
          });
        }
      });
    }
  },

  // Function to Get Company Details By Id ----------------------------------------->

  GetCompanybyId: (req, res) => {
    let CompanyId = "";
    if (typeof req.query.CompanyId != "undefined") {
      CompanyId = req.query.CompanyId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..CompanyId  is missing ",
      });
    }
    getCompanyById(CompanyId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server Error",
          error: err,
        });
      }
      if (!results.length) {
        return res
          .status(404)
          .json({ success: "0", message: " Resource does not exist." });
      } else {
        results[0].Logo =
          "https://api-tradego.herokuapp.com/uploads/" + results[0].Logo;
        let result = results[0];

        return res.status(200).json({
          success: "1",
          data: result,
        });
      }
    });
  },

  //Function to  Edit Company Profile ---------------------------------------->
  editCompanyProfile: (req, res) => {
    EditCompanyProfile(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal server error! Please try again",
          data: err,
        });
      } else if (results[12][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!",
        });
      } else if (results[12][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[13][0]["Err_msg"],
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Company Profile updated Successfully",
        });
      }
    });
  },
};
