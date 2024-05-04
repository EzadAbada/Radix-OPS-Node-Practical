const db = require("../models"); // models path depend on your structure
const Customers = db.customers;
const multer = require('multer');
const bcrypt = require("bcryptjs");
var validator = require("email-validator");
const Op = db.Sequelize.Op;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

exports.uploadImg = multer({storage: storage}).single('image');

function checkPwd(str) {
    if (str.length < 6) {
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
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name field is required!"
        });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({
            message: "Email field is required!"
        });
        return;
    }
    if (!validator.validate(req.body.email)) {
        res.status(400).send({
            message: "Invalid Email Address!"
        });
        return;
    }
    if (!req.body.phone_number) {
        res.status(400).send({
            message: "Phone number field is required!"
        });
        return;
    }
    if (!req.body.gender) {
        res.status(400).send({
            message: "Gender field is required!"
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: "Password field is required!"
        });
        return;
    }
    if (checkPwd(req.body.password) != 'ok') {
        res.status(400).send({
            message: "Password must be minimum 8 charactors, Should have One Capital character, One small character & One Symbol"
        });
        return;
    }

    // Create a customer
    const customer = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        gender: req.body.gender,
        address: req.body.address,
        phone_number: req.body.phone_number,
    };

    // Save Customer in the database
    Customers.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while creating the Customer."
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = {};
    condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const email = req.query.email;
    condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    const limit = req.query.limit;
    var dataLimit = limit ? parseInt(limit) : null;

    const offset = req.query.offset;
    var dataOfset = offset ? parseInt(offset) : null;
    Customers.findAll({where: condition, limit: dataLimit, offset: dataOfset})
        .then(data => {
            res.json({ "data" : data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving customers."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Customers.findByPk(id)
        .then(data => {
            if (!data) {
                res.send({'message' : 'No record Found'});
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name field is required!"
        });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({
            message: "Email field is required!"
        });
        return;
    }
    if (!validator.validate(req.body.email)) {
        res.status(400).send({
            message: "Invalid Email Address!"
        });
        return;
    }
    if (!req.body.phone_number) {
        res.status(400).send({
            message: "Phone number field is required!"
        });
        return;
    }
    if (!req.body.gender) {
        res.status(400).send({
            message: "Gender field is required!"
        });
        return;
    }
    // if (!req.body.password) {
    //     res.status(400).send({
    //         message: "Password field is required!"
    //     });
    //     return;
    // }
    // update a customer
    const customer = {
        name: req.body.name,
        email: req.body.email,
        // password: req.body.password,
        gender: req.body.gender,
        address: req.body.address,
        profile_image : req.file.path,
    };
    Customers.update(customer, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customers was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Customers.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customers was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customers with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customers with id=" + id
            });
        });
};

exports.getImage = (req, res) => {
    const id = req.params.id;

    Customers.findByPk(id)
        .then(data => {
            res.send({'profile_image' : req.protocol + '://' + req.get('host') + '/' +  data.profile_image});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer profile image with id=" + id
            });
        });
};




