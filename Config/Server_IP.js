let extIP = require("ext-ip")();

exports.Public_IP = function() {
  if (process.env.PROD_ENV) {
    extIP
      .get()
      .then(ip => {
        return ip;
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    return "127.0.0.1";
  }
};
