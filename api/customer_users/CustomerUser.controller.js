
const { getUserByUserEmail,
  createcustomer_User} = require("./CustomerUser.service");

const { getUserByUserEmail, resetPassword } = require("./CustomerUser.service");

//const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const { sendMail } = require("../../Config/sendEmail");
module.exports = {
  authcustomeruser: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      console.log(body.password);
      // const result = compareSync(body.password, results.Password);

      const result = true;
      debugger;
      if (result) {
        debugger;
        results.Password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1d"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          data: results
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },

  // Forget Password for APP (Customer )------------------------------->
  forgetPasswordCustomer: (req, res) => {
    const body = req.body;

    resetPassword(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
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
