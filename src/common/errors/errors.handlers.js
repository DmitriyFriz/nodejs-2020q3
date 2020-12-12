const { StatusCodes } = require('http-status-codes');

const handle = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    err.message = `Internal Server Error: ${err.message}`;
  }

  next(err);
};

const send = (err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
  next();
};

const asyncWrapper = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  handle,
  send,
  asyncWrapper
};
