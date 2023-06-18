/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable eol-last */
class ValidationError extends Error {// 400
  constructor(message) {
    super(message),
    this.status = 400,
    this.message = message || "Вы ввели некоректные данные"
  }
}

module.exports = {
  ValidationError,
}