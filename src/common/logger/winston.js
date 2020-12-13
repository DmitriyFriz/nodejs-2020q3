const { createLogger, format, transports } = require('winston');

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

const logger = createLogger({
  transports: [
    new transports.File(options.infoFile),
    new transports.File(options.errorFile),
    new transports.Console(options.console)
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

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
