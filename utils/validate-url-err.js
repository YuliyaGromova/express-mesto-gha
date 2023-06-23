/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
/* eslint-disable linebreak-style */

// const reg = /https?:\/\/w?w?w?[a-z.\/0-9\-\_\~\:\/\?\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#?/i;

const reg = /https?:\/\/(www\.)?([A-z0-9-]{2,63}\.)+[A-z0-9]{1,6}[A-z.\/0-9\-\_\~\:\/\?\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#?/i;
const validateURL = (v) => {
  return reg.test(v);
};

module.exports = {
  validateURL,
  reg,
};
