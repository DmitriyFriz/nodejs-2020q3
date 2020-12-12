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

module.exports = { logRequest };
