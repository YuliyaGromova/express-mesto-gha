/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable eol-last */
class NotFoundError extends Error {// 404
  constructor(message) {
    super(message),
    this.status = 404,
    this.message = message || "Запрашиваемый объект не найден"
  }
}

module.exports = {
  NotFoundError,
}