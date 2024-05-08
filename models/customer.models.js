const bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name Field Is required",
                    args: true,
                },
            customValidator(value) {
                if (/[^a-zA-Z0-9]/.test(value)) {
                    throw new Error("Only Alphanewmaric values allow");
                } else {

                }
            },
            },
        },
        email: {
            type: Sequelize.STRING,
            unique: {
                args: true,
                msg: "Email Already Exists."
            },
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Email Can`t be Empty."
                },
                notNull: {
                    args: true,
                    msg: "Email Can`t be Null"
                },
                isEmail: {
                    args: true,
                    msg: "Please Enter Valid Email Address."
                }, 
            }
        },
        // password: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     validate: {
        //         notEmpty: {
        //             args: true,
        //             msg: "Password Can`t be Empty."
        //         },
        //         notNull: { 
        //             args: true, 
        //             msg: 'Password Can`t  be null' 
        //         },           
        //         min: { 
        //             args: 5, 
        //             msg: 'password length must be more than 5 characters' 
        //         },
        //     }
        // },
        password: {
            type: Sequelize.STRING,
            allowNull: false,

            validate: {
                is: {
                    args: /^[A-Za-z@#$%^&+!=]/i,
                    msg: 'Password should contain minimum 8 character including One lowercase, One Uppercase, One Symbol'
                },
                len: {
                    args: [8],
                    msg: 'Password should contain minimum 8 character including One lowercase, One Uppercase, One Symbol'
                }
            }
        },
        gender: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.ENUM('Male', 'Female', 'Other'),
            allowNull: false,
            validate: {
                isIn: { 
                    args: [['Male', 'Female', 'Other']],
                    msg: "Only Male,Female and Other values allowd"
                },
            }
        },
        address: {
            type: Sequelize.STRING(255),
            validate: {
                customValidator(value) {
                    if (value != null && value.length > 255) {
                      throw new Error("address can't be grater then 255 character.");
                    }
                },
            }
        },
        profile_image: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING(10),
            allowNull: false,
            validate: {
                customValidator(value) {
                    console.log(value);
                    console.log(value.length);
                    if (value != null && value.length != 10) {
                      throw new Error("Only 10 numbers allow.");
                    }
                },
                notEmpty: {
                    msg: "Phone number Field Is required",
                    args: true,
                }
            }
        }
    });
    Customer.beforeCreate(async (cust) => {
        cust.password =  bcrypt.hashSync(cust.password, 8);
    });
    return Customer;
};