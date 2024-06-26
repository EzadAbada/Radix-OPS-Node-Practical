const db = require("../models");
const config = require("../config/auth.config");
const Customers = db.customers;
var validator = require("email-validator");
const Op = db.Sequelize.Op;
const asyncErrorHandler = require('../asyncErrorHandler');
// const { query, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function checkPwd(str) {
    if (str.length < 8) {
        return("too_short");
    } else if (str.length > 50) {
        return("too_long");
    } else if (str.search(/\d/) == -1) {
        return("no_num");
    } else if (str.search(/[a-zA-Z]/) == -1) {
        return("no_letter");
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        return("bad_char");
    }
    return("ok");
}
exports.register = asyncErrorHandler ( async (req, res, next) => {

    // console.log(aaaa);
    // TextDecoderStream();
    // const errors = validationResult(req)
        // Validate request
        // if (!req.body.name) {
        //     res.status(400).send({
        //         message: "Name field is required!"
        //     });
        //     return;
        // }
        // if (!req.body.email) {
        //     res.status(400).send({
        //         message: "Email field is required!"
        //     });
        //     return;
        // }
        // if (!validator.validate(req.body.email)) {
        //     res.status(400).send({
        //         message: "Invalid Email Address!"
        //     });
        //     return;
        // }
        // if (!req.body.phone_number) {
        //     res.status(400).send({
        //         message: "Phone number field is required!"
        //     });
        //     return;
        // }
        // if (!req.body.gender) {
        //     res.status(400).send({
        //         message: "Gender field is required!"
        //     });
        //     return;
        // }
        // if (!req.body.password) {
        //     res.status(400).send({
        //         message: "Password field is required!"
        //     });
        //     return;
        // }
        // if (checkPwd(req.body.password) != 'ok') {
        //     res.status(400).send({
        //         message: "Password must be minimum 8 charactors, Should have One Capital character, One small character & One Symbol"
        //     });
        //     return;
        // }
    const customer = await Customers.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        address: req.body.address,
        phone_number: req.body.phone_number,
    });
    if (customer) res.send({ message: "Customer registered successfully!" });

});

exports.login = asyncErrorHandler ( async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (errors.isEmpty()) {
    //     console.log('nO ERROR');
    // } else {
    //     console.log(errors);
    // }
    // return false;
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "Email field is required!"
    //     });
    //     return;
    // }
    // if (!validator.validate(req.body.email)) {
    //     res.status(400).send({
    //         message: "Invalid Email Address!"
    //     });
    //     return;
    // }
    // if (!req.body.password) {
    //     res.status(400).send({
    //         message: "Password field is required!"
    //     });
    //     return;
    // }
    // if (checkPwd(req.body.password) != 'ok') {
    //     res.status(400).send({
    //         message: "Password must be minimum 8 charactors, Should have One Capital character, One small character & One Symbol"
    //     });
    //     return;
    // }
    const customer = await Customers.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!customer) {
      return res.status(404).send({ message: "Customer Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      customer.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: customer.id },
                           config.secret,
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400, // 24 hours
                           });
    // req.session.token = token;

    return res.status(200).send({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        "token": token,
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});