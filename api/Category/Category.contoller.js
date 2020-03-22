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
    create_Category(req, (err, results) => {
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
        return res.status(201).json({
          success: "1",
          message: "Category created Successfully"
        });
      }
    });
  },

  //---------------------------------------------------------------------------------------------

  //Function to Get All category by company id, category name--------------
  getCategories: (req, res) => {
    var response = [];
    console.log(req.query);

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
            if (result.categoryname.toString() == req.query.CategoryName) {
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
      } else if (results[6][0]["status"] == null) {
        return res.status(500).json({
          success: "0",
          message: "Internal server error!"
        });
      } else if (results[6][0]["status"] == "0") {
        return res.status(400).json({
          success: "0",
          message: results[7][0]["Err_msg"]
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
