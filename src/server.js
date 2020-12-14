const { PORT } = require('./common/config');
const winston = require('./common/logger/winston');

const errorTransport = winston.transports[1];

process
  .on('uncaughtException', () => {
    errorTransport.on('open', () => {
      // wait until errorTransport._dest is ready

      errorTransport._dest.on('finish', () => {
        // eslint-disable-next-line no-process-exit
        process.exit(1);
      });
      winston.end();
    });
  })
  .on('unhandledRejection', reason => {
    if (reason instanceof Error) throw reason;
  });

const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
