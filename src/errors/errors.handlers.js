const handleMiddleware = (err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
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
  handleMiddleware,
  asyncWrapper
};
