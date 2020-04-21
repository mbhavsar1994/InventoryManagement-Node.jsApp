require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cron = require("node-cron");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const cors = require("cors");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_KEY;

const {
  getUserByUserEmail,
  getUserByid,
} = require("./api/company_users/CompanyUser.service");

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);

  getUserByUserEmail(jwt_payload.email, (err, results) => {
    if (results) {
      next(null, results);
    } else {
      let {
        getUserByUserEmail,
      } = require("./api/customer_users/CustomerUser.service");
      getUserByUserEmail(jwt_payload.email, (err, results) => {
        if (results) {
          next(null, results);
        } else {
          next(
            null,
            false,

            { success: "0", message: "Invalid access token." }
          );
        }
      });
    }
  });
});

// use the strategy
passport.use(strategy);

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    /*
      uuidv4() will generate a random ID that we'll use for the
      new filename. We use path.extname() to get
      the extension from the original file name and add that to the new
      generated ID. These combined will create the file name used
      to save the file on the server and will be available as
      req.file.pathname in the router handler.
    */

    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  },
});

// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });
exports.upload = upload;

const app = express();

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Inventory Management API Swagger Documentation",
      version: "1.0.0",
      description: "End Points to test Inventory management routes",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://18.218.124.225:3000",
      },
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  apis: [
    "./api/company_users/CompanyUser.router.js",
    "./api/Category/Category.router.js",
    "./api/product/Product.router.js",
  ],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve);

app.get(
  "/api-docs",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

//full swagger.json schema that gets created by the swaggerSpec.
app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});
//enable cors policy
app.use(cors());

// initialize passport with express
app.use(passport.initialize());

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// API Routers
const companyuserRouter = require("./api/company_users/CompanyUser.router");
const customeruserRouter = require("./api/customer_users/CustomerUser.router");
const countriesRouter = require("./api/countryandprovince/CountryAndProvince.router");

const supplierRouter = require("./api/Supplier/Supplier.router");
const categoryRouter = require("./api/Category/Category.router");
const productRouter = require("./api/Product/Product.router");
const purchaseOrderRouter = require("./api/PurchaseOrder/PurchaseOrder.router");

const DeliveryRouter = require("./api/Delivery/Delivery.router");

const salesRouter = require("./api/sales/Sales.router");

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/companyuser", companyuserRouter);
app.use("/api/customeruser", customeruserRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/getprovinces", countriesRouter);
app.use("/api/provinces", countriesRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/purchaseorder", purchaseOrderRouter);
app.use("/api/delivery", DeliveryRouter);

app.use("/api/sales", salesRouter);
// Main Root
app.get("/", function (req, res) {
  res.json({ message: "Inventory Management API is up!" });
});
var port = process.env.PORT || 3000;
var server = app.listen(port, () => {
  console.log("Listening on port " + port + "...");
});
