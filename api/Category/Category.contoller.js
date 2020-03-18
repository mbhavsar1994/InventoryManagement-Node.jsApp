const _ = require("lodash");
const { getAllCategory, create_Category } = require("./Category.service");
module.exports = {
  //create new category
  createCategory: (req,res)=>{
    
    create_Category(req,(err,results)=>{
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err
        });
      } else if (results[5][0]["status"] == null) {
        return res.json({
          success: 0,
          message: "Internal server error!"
        });
      } else if (results[5][0]["status"] == "0") {
        return res.json({
          success: 0,
          message: results[6][0]["Err_msg"]
        });
      } else {
        return res.json({
          success: 1,
          message: "Category created Successfully"
        });
      }
      
      
    });
  },
  getCategories: (req, res) => {
    var response = [];
    console.log(req.query);

    getAllCategory(req.body.CompanyId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err
        });
      }
      if (!results.length) {
        return res
          .status(404)
          .json({ success: false, message: " Resource does not exist." });
      } else {
        if (typeof req.query.CategoryName != "undefined") {
          results.filter(function(result) {
            if (result.Category_name.toString() == req.query.CategoryName) {
              response.push(result);
            }
          });
        }
        // de-duplication:
        response = _.uniqBy(response, "CategoryId");

        // in case no filtering has been applied, respond with all stores
        if (Object.keys(req.query).length === 0) {
          response = results;
        }

        return res.status(200).json({
          success: "200",
          data: response
        });
      }
    });
  }
};
