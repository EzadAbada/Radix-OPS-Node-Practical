const db = require("../models");
const Customers = db.customers;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    console.log('I am in checkDuplicateUsernameOrEmail');
  try {
    // Email
    customer = await Customers.findOne({
      where: {
        email: req.body.email
      }
    });

    if (customer) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate email!"
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;