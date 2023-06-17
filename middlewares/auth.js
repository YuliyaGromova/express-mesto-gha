/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next(); // пропускаем запрос дальше
};
