//project dependcies
const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const routes = require("../routes");
const cors = require("cors");
var bodyParser = require("body-parser");

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(process.env.DB_URL, {
      //these are options to ensure that the connection is done properly
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
      const app = express();
      const whitelist = ["http://localhost:3000"];
      const corsOptions = {
        origin: function (origin, callback) {
          if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      };
      app.use(cors(corsOptions));
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(routes);
      app.use(express.json());

      app.listen(5200, () => {
        console.log("server running ");
      });
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
