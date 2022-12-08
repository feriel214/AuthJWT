const express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// require database connection
const dbConnect = require("./db/dbConnect");

// execute database connection
dbConnect();
