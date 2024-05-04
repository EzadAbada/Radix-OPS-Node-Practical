const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const bodyParser =  require('body-parser');
const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const db = require("./models");
db.sequelize.sync();
require('./routes/customer.routes')(app);
require('./routes/auth.routes')(app);

app.listen(PORT, function(){
    console.log(`server port is ${PORT}`);
});
app.get('/', function(req, res){
    res.json({ message: 'Test response' })
});

