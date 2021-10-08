/* eslint-disable */
const jwt = require("jsonwebtoken");

require('dotenv').config({ path: './config.env' });

const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(403).send("For Authentication token required!! Please provide token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACC_ACTIVATE);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;