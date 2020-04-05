const {
  getUserByUserEmail,
  createCustomer,
  resetPassword,
  edituser,
  getUserById
} = require("./CustomerUser.service");

const { sign } = require("jsonwebtoken");
// config file to send email
const { sendMail } = require("../../Config/sendEmail");

module.exports = {
  //API to Authenticate Customer--------------------------------------------------------------------------------
  authcustomeruser: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server error!",
          data: err
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
        let payload = { email: results.Email };
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
          message: "Invalid password..!"
        });
      }
    });
  },
  //-----------------------------------------------------------------------------------------------------

  //-- Function to create customer user profile
  createcustomeruser: (req, res) => {
    var regex = /\S+@\S+\.\S+/;
    if(req.body.email==null)
    {
      return res.status(400).json({
        success: "0",
        message: "email is require"
      });
    }
    else if(req.body.email == req.body.email .match(regex))
    {
      createCustomer(req, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: "0",
            message: "Internal Server error! Please try again",
            data: err
          });
        } else if (results[13][0].Err_msg != null) {
          return res.status(400).json({
            success: "0",
            message: results[13][0].Err_msg
          });
        } else {
          return res.status(200).json({
            success: "1",
            message: "User Profile created Successfully"
          });
        }
      });
    }
    else{
      return res.status(400).json({
        success: "0",
        message: "email  should be in example@gmail.com"
      });
    }
    
  },

  // Forget Password for APP (Customer )------------------------------->
  forgetPasswordCustomer: (req, res) => {
    const body = req.body;
   // console.log(body);
    resetPassword(req, (err, results) => {
      console.log(results);
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
  },
  //edit user
  editcustomeruser: (req, res) => {
    var regex = /\S+@\S+\.\S+/;
    if(req.body.email==null)
    {
      return res.status(400).json({
        success: "0",
        message: "email is require"
      });
    }
    else if(req.body.email == req.body.email .match(regex))
    {
      edituser(req, (err, results) => {
        console.log(results);
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: "0",
            message: "Internal Server error! Please try again",
            data: err
          });
        } else if (results[14][0].Err_msg != null) {
          return res.status(400).json({
            success: "0",
            message: results[14][0].Err_msg
          });
        } else if(results[12].affectedRows==0)
        {
          return res.status(400).json({
            success: "1",
            message: "need to update something"
          });
        }
        else {
          return res.status(200).json({
            success: "1",
            message: "User Profile updated Successfully"
          });
        }
      });
    }
    else{
      return res.status(400).json({
        success: "0",
        message: "email  should be in example@gmail.com"
      });
    }
  },
  //get user by id
  getUserDetailsById: (req, res) => {
    let userid=0;
    if(req.query.userid==undefined) {
      return res.status(400).json({
        success: "0",
        message: "user id needed!"
      });
    }else{
      userid=req.query.userid;
      console.log(userid);
      getUserById(userid, (err, results) => {
        console.log(results[0]);
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: "0",
            message: "Internal Server Error",
            error: err
          });
        }
        if (!results.length) {
          return res
            .status(404)
            .json({ success: "0", message: " Resource does not exist." });
        }
        else{
          return res.status(200).json({
            success: "1",
            data: results
          });
        }
      });
    }
  }
};
