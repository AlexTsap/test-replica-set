'use strict';
// const mongoMiddleware = require('./mongo.middleware');

/* eslint-disable*/
module.exports = app => {
  require('./about');
  require('./articles');
  require('./things');
  require('./places');
  require('./infoPlaces');
  // mongoMiddleware(app);
};
/* eslint-enable*/
