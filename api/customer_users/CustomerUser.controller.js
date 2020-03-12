const { getUserByUserEmail,
  createcustomer_User} = require("./CustomerUser.service");
//const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
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
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },

  createcustomeruser: (req, res) => {
    createcustomer_User(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err
        });
      }
      
      //console.log(req);
      console.log(results);
      if (results != null) {
        return res.json({
          success: 0,
          error_msg: results
        });
      } else {
        return res.json({
          success: 1,
          message: "customer Profile created Successfully"
        });
      }
     // console.log(body);
    
    });
  }
  
};
