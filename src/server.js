const { PORT } = require('./common/config');
const logger = require('./common/logger');

process
  .on(
    'uncaughtException',
    // eslint-disable-next-line no-process-exit
    logger.uncaughtException(() => process.exit(1))
  )
  .on('unhandledRejection', reason => {
    if (reason instanceof Error) throw reason;
  });

const app = require('./app');

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
