'use strict';
const student = require('./api/student');

module.exports = (app) => {
  student(app);
};