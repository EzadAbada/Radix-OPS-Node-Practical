module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        profile_image: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        }
    });
    return Customer;
};