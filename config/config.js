
// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "complex-password",
//     DB: "node_practical",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };

const { HOST, DB_USER, PASSWORD, DB, dialect } = process.env;
// console.log(HOST, DB_USER, PASSWORD, DB, dialect)
module.exports = {
    HOST: HOST || 'localhost',
    USER: DB_USER || 'root',
    PASSWORD: PASSWORD || 'complex-password',
    DB: DB || 'node_practical',
    dialect: dialect || 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
