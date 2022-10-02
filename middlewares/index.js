const validateContactBody = require('./validateContactBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validateContactBody,
  authenticate,
  isValidId,
  upload,
};
