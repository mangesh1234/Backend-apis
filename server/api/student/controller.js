'use strict';
const restify = require('restify');
const logger = restify.getLogger('student');
exports.create = (req,res, next) => {
  res.send('good afternoon=====');
  console.log('hello');
};