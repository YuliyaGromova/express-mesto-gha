/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-sequences */

const { NotFoundError } = require('../errors/not-found-err');
const { ValidationError } = require("../errors/validation-err");
const { UnauthorizedError } = require("../errors/unauthorized-err");
const { UniqueError } = require('../errors/unique-err');
const { InternalServerError } = require('../errors/server-err');
const { ForbiddenError } = require('../errors/forbidden-err');

const errorHandler = (err, req, res, next) => {
  let error;
  if (err.name === "Error") {
    error = new NotFoundError(err);// 404
  } else if (err.name === "ValidationError" || err.name === "CastError") { // 400
    error = new ValidationError(err);
  } else if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") { // 401
    error = new UnauthorizedError(err);
  } else if (err.code === 11000) { // 409
    error = new UniqueError(err);
  } else if (err.name === "ForbiddenError") {
    error = new ForbiddenError(err);
  } else {
    error = new InternalServerError(err); // 500
  }
  res.status(error.status).send({ message: error.message });
  next();
}

module.exports = {
  errorHandler,
}
