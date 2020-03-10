require("dotenv").config();

const express = require("express");
const app = express();
const companyuserRouter = require("./api/company_users/CompanyUser.router");
const customeruserRouter = require("./api/customer_users/CustomerUser.router");

app.use(express.json());

app.use("/api/companyuser", companyuserRouter);
app.use("/api/customeruser", customeruserRouter);

var server = app.listen(process.env.APP_PORT, () => {
  console.log("Listening on port " + process.env.APP_PORT + "...");
});
