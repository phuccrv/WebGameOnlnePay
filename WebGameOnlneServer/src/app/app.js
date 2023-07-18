const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet')
const cors = require('cors');
const Routes = require('./routes');
const uploadOne = require("./routes/upload_one.route")
const path = require("path");
//middleware
app.use(express.urlencoded());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(helmet());
app.use(cors())

//doc file static
app.use(express.static(path.join(__dirname, "../../public")))

//database

//router
Routes(app)

//test upload 
app.use("/api/v1/upload-one", uploadOne)

//handle errors

module.exports = app
