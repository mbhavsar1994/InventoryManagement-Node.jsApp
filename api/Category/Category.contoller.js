const _ = require("lodash");
const {
  getAllCategory,
  create_Category,
  EditCategory,
  GetCategoryById
} = require("./Category.service");

module.exports = {
  //Function to create new category----------------------------------------------------
  createCategory: (req, res) => {
    const regex = /[a-z][a-z][a-z][a-z]-[0-9][0-9][0-9][0-9]-[0-9][0-9]/;
    if(req.body.SKU==null)
    {
      return res.status(400).json({
        success: "0",
        message: "SKU require"});
    }
    else if(req.body.SKU.length!=12)
    {
      return res.status(400).json({
        success: "0",
        message: "SKU length must be 13 and in a xxxx-0000-00 where x(letters)and 0(digits)"
      });
    }
    else if(req.body.SKU == req.body.SKU .match(regex))
    {
      create_Category(req, (err, results) => {
        console.log(results[5][0]);
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: "0",
            message: "Internal server error! please try again.",
            data: err
          });
        } else if (results[5][0]["status"] == null) {
          return res.status(500).json({
            success: "0",
            message: "Internal server error!"
          });
        } else if (results[5][0]["status"] == "0") {
          return res.status(400).json({
            success: "0",
            message: results[6][0]["Err_msg"]
          });
        } else {
          return res.status(200).json({
            success: "1",
            message: "Category created Successfully"
          });
        }
      });
    }
    else
    {
      return res.status(400).json({
        success: "0",
        message: "SKU in wrong pattern xxxx-0000-00"
      });
    }
  },

  //---------------------------------------------------------------------------------------------

  //Function to Get All category by company id, category name--------------
  getCategories: (req, res) => {
    var response = [];
    console.log(req.query);

    if (typeof req.body.CompanyId == "undefined") {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..CompanyId id is missing!"
      });
    }
    getAllCategory(req.body.CompanyId, (err, results) => {
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
      } else {
        if (typeof req.query.CategoryName != "undefined") {
          results.filter(function(result) {
            
            if (_.includes(result.categoryname.toString(),req.query.CategoryName)) {
              response.push(result);
            }
          });
        }
        // de-duplication: by category id
        response = _.uniqBy(response, "CategoryId");

        // in case no filtering has been applied, respond with all stores
        if (Object.keys(req.query).length === 0) {
          response = results;
        }

        return res.status(200).json({
          success: "1",
          data: response
        });
      }
    });
  },
  //------------------------------------------------------------------------------------------------------

  // Fuction to edit category details by--------------------------------------------------------------
  EditCategory: (req, res) => {
    EditCategory(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "0",
          message: "Internal Server error! Please try again",
          data: err
        });
      } else if (results[5][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      } else if (results[5][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[6][0]["Err_msg"]
        });
      } else {
        return res.status(200).json({
          success: "1",
          message: "Category updated Successfully"
        });
      }
    });
  },

  //-----------------------------------------------------------------------------------------------

  // Function to get category details by company  id  and category id -------------------------------------------------
  GetCategorydetailsById: (req, res) => {
    let CategoryId = "";
    let CompanyId = "";
    if (typeof req.query.CategoryId != "undefined") {
      CategoryId = req.query.CategoryId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..Category id is missing!"
      });
    }
    if (typeof req.query.CompanyId != "undefined") {
      CompanyId = req.query.CompanyId;
    } else {
      return res.status(400).json({
        success: "0",
        message: "Invalid request..CompanyId  is missing!"
      });
    }
    GetCategoryById(CompanyId, CategoryId, (err, results) => {
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
      } else {
        return res.status(200).json({
          success: "1",
          data: results
        });
      }
    });
  }
  //------------------------------------------------------------------------------------------------------------
};
