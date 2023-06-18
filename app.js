/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
require('dotenv').config();

const { errors } = require('celebrate');

const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require('cookie-parser');
const router = require("./routes");
const { errorHandler } = require("./middlewares/error");

const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
  })
  .then(() => console.log("OK"));

app.use(express.json());
app.use(cookieParser());

app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT);
});
