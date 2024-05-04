
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "complex-password",
    DB: "node_practical",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

// const dotenv = require('dotenv');
// dotenv.config({ path: 'config.env' });
// module.exports = {
//     HOST: process.env.HOST,
//     USER: process.env.USER,
//     PASSWORD: process.env.PASSWORD,
//     DB: process.env.DB,
//     dialect: process.env.dialect,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };