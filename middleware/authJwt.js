const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Customers = db.customers;

verifyToken = (req, res, next) => {
//   let token = req.session.token;
let userToken = req.headers.authorization;


  if (!userToken) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  if (userToken)
    userToken = userToken.replace('Bearer ', '');

  jwt.verify(userToken,
             config.secret,
             (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.id = decoded.id;
              next();
             });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;