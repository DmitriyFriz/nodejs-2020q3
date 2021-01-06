const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const logger = require('./logger');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });

  const db = mongoose.connection;

  db.once('open', () => {
    logger.info('Connect to DB');
    db.dropDatabase();

    cb();
  });
};

module.exports = { connectToDB };
