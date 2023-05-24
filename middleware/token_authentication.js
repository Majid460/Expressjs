const jwt = require("jsonwebtoken");
const { Constants } = require("../utils/constants");
//Middleware
const authenticateJWT = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (header) {
      const token = header.split(" ")[1];

      jwt.verify(token, Constants.secretKey, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token is invalid" });
        }
        next();
      });
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { authenticateJWT };
