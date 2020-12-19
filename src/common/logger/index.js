const morgan = require('./morgan');
const winston = require('./winston');

const middlewareRequest = morgan(
  '[method: :method] [status: :status] [url: :url]  [body: :body]  [query: :query] [:response-time ms]',
  {
    stream: winston.stream
  }
);

const middlewareError = (err, req, res, next) => {
  const { method, originalUrl, body, query } = req;
  const { statusCode, message } = err;
  winston.error(
    `[method: ${method}] [status: ${statusCode}] [url: ${originalUrl}] [error: ${message}] [body: ${JSON.stringify(
      body
    )}] [query: ${JSON.stringify(query)}]`
  );
  next(err);
};

const uncaughtException = cb => () => {
  const errorTransport = winston.transports[0];

  errorTransport.on('open', () => {
    // wait until errorTransport._dest is ready

    errorTransport._dest.on('finish', () => {
      cb();
    });
    winston.end();
  });
};

module.exports = {
  middlewareRequest,
  middlewareError,
  uncaughtException,
  info: winston.info.bind(winston),
  error: winston.error.bind(winston)
};
