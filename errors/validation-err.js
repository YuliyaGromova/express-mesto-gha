/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable eol-last */
class ValidationError extends Error {// 400
  constructor(err) {
    super(err),
    this.status = 400,
    this.message = "Вы ввели некоректные данные"
  }
}

module.exports = {
  ValidationError,
}