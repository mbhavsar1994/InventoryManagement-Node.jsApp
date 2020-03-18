const {
  getUserByUserEmail,
  createCustomer,
  resetPassword
} = require("./CustomerUser.service");

//const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const { sendMail } = require("../../Config/sendEmail");

module.exports = {
  //API to Authenticate Customer
  authcustomeruser: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results.length) {
        return res.status(401).json({
          message: "Invalid email address"
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
          message: "login successfully",
          token: token,
          data: results
        });
      } else {
        return res.status(401).json({
          message: "Invalid password..!"
        });
      }
    });
  },
  createcustomeruser: (req, res) => {
    createCustomer(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err
        });
      } else if (results[13][0].Err_msg != null) {
        return res.json({
          success: 0,
          message: results[13][0].Err_msg
        });
      } else {
        return res.json({
          success: 1,
          message: "User Profile created Successfully"
        });
      }
      console.log(results[13][0].Err_msg);
    });
  },

  // Forget Password for APP (Customer )------------------------------->
  forgetPasswordCustomer: (req, res) => {
    const body = req.body;
    console.log(body)
    resetPassword(req, (err, results) => {
      //console.log(results);
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
          console.log("jvhd");
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
