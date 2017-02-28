'use strict';
const controller = require('./controller');

module.exports = (routes) => {
  routes.get('/api/student', controller.create);
};