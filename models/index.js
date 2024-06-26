const dbConfig = require("../config/config.js");
console.log(dbConfig)
const {Sequelize} = require("sequelize");
const op = Sequelize.Op;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.customers = require("./customer.models.js")(sequelize, Sequelize);


module.exports = db;