require("dotenv").config();

const express = require("express");
bodyParser = require("body-parser");

const passport = require("passport");
const passportJWT = require("passport-jwt");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_KEY;

const { getUserByid } = require("./api/company_users/CompanyUser.service");

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);

  getUserByid(jwt_payload.id, (err, results) => {
    if (results) {
      next(null, results);
    } else {
      next(null, false);
    }
  });
});

// use the strategy
passport.use(strategy);

const app = express();

// initialize passport with express
app.use(passport.initialize());

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const companyuserRouter = require("./api/company_users/CompanyUser.router");
const customeruserRouter = require("./api/customer_users/CustomerUser.router");
<<<<<<< HEAD
const supplier = require("./api/Supplier/Supplier.router");

app.use(express.json());

app.use("/api/companyuser", companyuserRouter);
app.use("/api/customeruser", customeruserRouter);
app.use("/api/supplier", supplier);
=======
const countriesRouter = require("./api/countryandprovince/CountryAndProvince.router");
const supplier = require("./api/Supplier/Supplier.router");
const category = require("./api/Category/Category.router");

app.use("/api/companyuser", companyuserRouter);
app.use("/api/customeruser", customeruserRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/supplier", supplier);
app.use("/api/category", category);

// Main Root
app.get("/", function(req, res) {
  res.json({ message: "Inventory Management API is up!" });
});
>>>>>>> e1c708ae8e597d3acef3c4bb764c9ed17a1b88d4

var server = app.listen(process.env.APP_PORT, () => {
  console.log("Listening on port " + process.env.APP_PORT + "...");
});
