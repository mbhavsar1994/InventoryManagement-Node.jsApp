const {
  getUserByUserEmail,
  createCompany_User,
  resetPassword
} = require("./CompanyUser.service");

//const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { sendMail } = require("../../Config/sendEmail");
module.exports = {
  authcompanyuser: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(401).json({
          success: "0",
          message: "Invalid email or password"
        });
      }
      console.log(body.password);

      debugger;
      if (body.password === results.Password) {
        debugger;
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

  // Inserting Company User and Company Details ------------>
  createCompany: (req, res) => {
    createCompany_User(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err
        });
      } else if (results[15][0]["status"] == null) {
        return res.json({
          success: 0,
          message: "Internal server error!"
        });
      } else if (results[15][0]["status"] == "0") {
        return res.json({
          success: 0,
          message: results[16][0]["Err_msg"]
        });
      } else {
        return res.json({
          success: 1,
          message: "Company Profile created Successfully"
        });
      }
    });
  },

  // Forget Password for APP (Company )------------------------------->
  forgetPasswordCompany: (req, res) => {
    const body = req.body;

    resetPassword(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results.length) {
        return res.json({
          success: 0,
          data: err
        });
      } else {
        sendMail(results[0]["Email"], results[0]["Password"], (err, result) => {
          if (err) {
            return res.json({
              success: 0,
              data: err
            });
          }
          if (result) {
            return res.json({
              success: 1,
              data: result
            });
          }
        });
      }
      console.log(body.password);
    });
  }
};
