const monggose = require("mongoose");
require("dotenv").config();
const connection = monggose.connect(process.env.MONGO_URL);
module.exports = {
  connection,
};
