/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable eol-last */
class UnauthorizedError extends Error {// 401
  constructor(err) {
    super(err),
    this.status = 401,
    this.message = "Необходима авторизация"
  }
}

module.exports = {
  UnauthorizedError,
}