/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable eol-last */
class InternalServerError extends Error {// 500
  constructor(message) {
    super(message),
    this.status = 500,
    this.message = message || "Ошибка подключения к серверу"
  }
}

module.exports = {
  InternalServerError,
}