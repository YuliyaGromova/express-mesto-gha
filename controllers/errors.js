/* eslint-disable quotes */
/* eslint-disable semi */
const checkError = (err, req, res) => {
  const error = {};
  if (err.name === "Error") {
    error.status = 404;
    error.message = "Запрашиваемый объект не найден";
  } else if (err.name === "ValidationError" || err.name === "CastError") {
    error.status = 400;
    error.message = "Вы ввели некоректные данные";
  } else {
    error.status = 500;
    error.message = "Internal Server Error";
  }
  return res.status(error.status).send({ message: error.message });
};

module.exports = {
  checkError,
}
