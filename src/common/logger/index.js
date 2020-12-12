const morgan = require('./morgan');
const winston = require('./winston');

const loggerRequest = morgan(
  '[method: :method] [status: :status] [url: :url]  [body: :body]  [query: :query] [:response-time ms]',
  {
    stream: winston.stream
  }
);

const logRequest = (req, res, next) => {
  loggerRequest(req, res, next);
};

const logError = (err, req, res, next) => {
  const { method, originalUrl, body, query } = req;
  const { statusCode, message } = err;
  winston.error(
    `[method: ${method}] [status: ${statusCode}] [url: ${originalUrl}] [error: ${message}] [body: ${JSON.stringify(
      body
    )}] [query: ${JSON.stringify(query)}]`
  );
  next(err);
};

module.exports = { logRequest, logError };
