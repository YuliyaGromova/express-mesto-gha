/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
  })
  // .then(() => console.log("OK"));

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "647b3abc25bba2699456a918",
//   };

//   next();
// });

app.use(router);

app.listen(PORT, () => {
  console.log(PORT);
});
