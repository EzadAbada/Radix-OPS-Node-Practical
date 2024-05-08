const express = require('express');
const dotenv = require('dotenv');
const {path} = require('path');
dotenv.config();
const bodyParser =  require('body-parser');
const app = express();
const PORT = process.env.PORT;
// const formidable = require('express-formidable');
// const formData = require('express-form-data');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(formidable());
// app.use(formData.parse());
const db = require("./models");
const commonErrorHandler = require('./middleware/commonErrorHandler');

// db.sequelize.sync();
require('./routes/customer.routes')(app);
require('./routes/auth.routes')(app);

app.all('*', function(req, res, next) {
    const err = new Error(`Path ${req.originalUrl} not found`);
    err.statusCode = 404;
    return next(err);
});
app.use(commonErrorHandler);
app.listen(PORT, function(){
    console.log(`server port is ${PORT}`);
});
app.get('/', function(req, res){
    res.json({ message: 'Test response' })
});

