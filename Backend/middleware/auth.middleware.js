const jwt = require("jsonwebtoken");
require("dotenv").config();
const authorization = (req, res, next) => {
  const token = req.body.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const Userid = decoded.Userid;
      req.body.Userid = Userid;
      next();
    } else {
      res.send({ msg: "Login First" });
    }
  } else {
    res.send({ msg: "Login First" });
  }
};

module.exports = {
  authorization,
};
