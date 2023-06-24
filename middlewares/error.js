/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-sequences */

const errorHandler = (err, req, res, next) => {
  const errorCode = err.status || 500;
  const message = errorCode === 500 ? 'Ошибка подключения к серверу' : err.message;

  res.status(errorCode).send({ message });
  next();
}

module.exports = {
  errorHandler,
}
