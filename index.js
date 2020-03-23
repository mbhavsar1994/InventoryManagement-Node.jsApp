require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const cors = require("cors");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_KEY;

const {
  getUserByUserEmail,
  getUserByid
} = require("./api/company_users/CompanyUser.service");

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);

  getUserByUserEmail(jwt_payload.email, (err, results) => {
    if (results) {
      next(null, results);
    } else {
      let {
        getUserByUserEmail
      } = require("./api/customer_users/CustomerUser.service");
      getUserByUserEmail(jwt_payload.email, (err, results) => {
        if (results) {
          next(null, results);
        } else {
          next(null, false);
        }
      });
    }
  });
});

// use the strategy
passport.use(strategy);

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
        name: "API Support"
      }
    },
    servers: [
      {
        url: "http://18.218.124.225:3000"
      },
      {
        url: "http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer"
        }
      }
    }
  },
  apis: [
    "./api/company_users/CompanyUser.router.js",
    "./api/Category/Category.router.js",
    "./api/product/Product.router.js"
  ]
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve);

app.get(
  "/api-docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

//full swagger.json schema that gets created by the swaggerSpec.
app.get("/swagger.json", function(req, res) {
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
app.use(bodyParser.urlencoded({ extended: false }));

// API Routers
const companyuserRouter = require("./api/company_users/CompanyUser.router");
const customeruserRouter = require("./api/customer_users/CustomerUser.router");
const countriesRouter = require("./api/countryandprovince/CountryAndProvince.router");
const supplierRouter = require("./api/Supplier/Supplier.router");
const categoryRouter = require("./api/Category/Category.router");
const productRouter = require("./api/Product/Product.router");
const purchaseOrderRouter = require("./api/PurchaseOrder/PurchaseOrder.router");

app.use("/api/companyuser", companyuserRouter);
app.use("/api/customeruser", customeruserRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/provinces", countriesRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/purchaseorder", purchaseOrderRouter);

// Main Root
app.get("/", function(req, res) {
  res.json({ message: "Inventory Management API is up!" });
});

var server = app.listen(process.env.APP_PORT, () => {
  console.log("Listening on port " + process.env.APP_PORT + "...");
});
