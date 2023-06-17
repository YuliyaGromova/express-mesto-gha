/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable eol-last */
class ForbiddenError extends Error {// 403
  constructor(err) {
    super(err),
    this.status = 403,
    this.message = "Заполните обязательные поля"
  }
}

module.exports = {
  ForbiddenError,
}