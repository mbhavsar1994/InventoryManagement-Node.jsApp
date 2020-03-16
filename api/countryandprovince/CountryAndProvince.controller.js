
  
  const { getcountry, getProvince } = require("./CountryAndProvince.service");
  

  module.exports = {
    
    //fetching countries
    country: (req, res) => {
      getcountry(req, (err, results) => {
        if(results.length!=0)
        {
          return res.json({
            success: 1,
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
      
    },
    //fetching provinces by passing country id
    province:(req,res) =>{
      getProvince(
        req.body.country_id, (err, results) => {
          if(results.length!=0)
          {
            return res.json({
              success: 1,
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
  
        }
      );
    }
  };
  