const { createLogger, format, transports } = require('winston');
const { NODE_ENV } = require('../config');

const options = {
  infoFile: {
    level: 'info',
    filename: `${__dirname}/../../logs/app.log`,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
    format: format.combine(format.uncolorize())
  },

  errorFile: {
    level: 'error',
    filename: `${__dirname}/../../logs/error.log`,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
    format: format.combine(format.uncolorize())
  },

  console: {
    level: 'info',
    handleExceptions: true,
    handleRejections: true,
    json: true
  }
};

const loggerWinston = createLogger({
  transports: [
    new transports.File(options.infoFile),
    new transports.File(options.errorFile)
  ],
  format: format.combine(
    format.simple(),
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss Z'
    }),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  exitOnError: false
});

if (NODE_ENV === 'development') {
  loggerWinston.add(new transports.Console(options.console));
}

loggerWinston.stream = {
  write(message) {
    loggerWinston.info(message);
  }
};

module.exports = loggerWinston;
