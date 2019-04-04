'use strict';

const config = require('./config');
// const expressConfig = require('./express.config');
const dbConfig = require('./db.config');
// const compressionMiddleware = require('./compression.middleware');
// const serveStatic = require('./serve-static.middleware');

module.exports = app => {
  config(app);
  // expressConfig(app);
  dbConfig(app);
  // compressionMiddleware(app);
  // serveStatic(app);
};
