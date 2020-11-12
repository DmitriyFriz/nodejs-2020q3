const { StatusCodes } = require('http-status-codes');

const createError = statusCode =>
  class extends Error {
    constructor(message) {
      super(message);
      this.statusCode = statusCode;
    }
  };

module.exports = {
  NOT_FOUND: createError(StatusCodes.NOT_FOUND)
};
