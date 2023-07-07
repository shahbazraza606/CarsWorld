const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Uploads"));


const port = process.env.PORT || 3002;

const uri = process.env.ATLAS_URI;
app.listen(port, () => {
    console.log('Listening on Port ' + port);
    }
  );
  
  mongoose.connect(uri, {useNewUrlParser:true});
  const connection = mongoose.connection;
  connection.once('open', () => {
      console.log("Connected to DB! Working Fine :) :) :)");
  })
  
  const userRoutes = require("./Routes/userRoutes");
    app.use("/user", userRoutes);
  
    const carRoutes = require("./Routes/carRoutes");
    app.use("/car",carRoutes)