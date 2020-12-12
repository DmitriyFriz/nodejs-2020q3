const morgan = require('morgan');

morgan.token('body', req => JSON.stringify(req.body));

morgan.token('query', req => JSON.stringify(req.query));

module.exports = morgan;
