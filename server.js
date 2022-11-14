const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();
dotenv.config({path:'config.env'});

//log requests
app.use(morgan('tiny'));

connectDB();

//parse request to bodyparser
app.use(bodyparser.urlencoded({extended:true}))

//set iew engine
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname,"views"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


//load routers
app.use('/',require('./server/routes/router'))


const PORT = process.env.PORT || 8080

app.listen(PORT,() => {console.log(`server is reunning on http://localhost:${PORT}`)})

