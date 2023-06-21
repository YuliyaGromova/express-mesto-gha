/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
/* eslint-disable linebreak-style */
const reg = /https?:\/\/w?w?w?[a-z.\/0-9\-\_\~\:\/\?\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#?/i;
const validateURL = (v) => {
  return reg.test(v);
};

module.exports = {
  validateURL,
  reg,
};
