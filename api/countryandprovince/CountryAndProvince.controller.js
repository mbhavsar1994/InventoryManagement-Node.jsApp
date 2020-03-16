
  
  const { getcountry } = require("./CountryAndProvince.service");
  

  module.exports = {
    
    //create signup for app signup
    country: (req, res) => {
      getcountry(req, (err, results) => {
        if(results.length!=0)
        {
          return res.json({
            success: 0,
            data: results
          });
        }
        else{
          return res.json({
            success: 0,
            data: "No record found"
          });
        }
        console.log(results[0]);

      });
      
    }
  };
  