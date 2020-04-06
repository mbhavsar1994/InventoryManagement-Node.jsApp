var nodemailer = require("nodemailer");

module.exports = {
  sendMail: (mail, password, callback) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tradegoims@gmail.com",
        pass: "Admin@1234"
      }
    });

    var mailOptions = {
      from: "tradegoims@gmail.com",
      to: mail,
      subject: "Sending forgot password ...",
      html:
        " Hey..Please find your  password :" +
        password +
        "<br> Thank you <br> Team Trade Go."
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        callback(error);
      } else {
        console.log("Email sent: " + info.response);
        callback(null, info.response);
      }
    });
  }
};
