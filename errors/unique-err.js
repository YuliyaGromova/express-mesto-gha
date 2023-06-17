/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable eol-last */
class UniqueError extends Error {
  constructor(err) {
    super(err),
    this.status = 409,
    this.message = "Пользователь с таким логином уже создан"
  }
}

module.exports = {
  UniqueError,
}