const express = require('express');
const sequelize = require('./config/db');
const routes = require('./routes/index');
const auth = require('./config/auth')

const app = express();
app.use(express.json());
app.use(auth.opcional);
app.use('/', routes);

try {
    sequelize.authenticate();
    sequelize.sync();
    console.log("Connected to DB");
} catch (error){
    console.log("unable to connect to DB: ", error);
}

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("Server listening on PORT 3000");
});