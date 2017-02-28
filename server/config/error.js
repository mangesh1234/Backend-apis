'use strict';

const restify = require('restify');

/**
 * class for validation error.
 * @constructor[Object error] contains error object.
 * @augments restify.RestError
 */
class ValidationError extends restify.RestError {
  constructor(error) {
    super({
      statusCode: 409,
      constructorOpt: ValidationError,
      body: {
        code: 'ValidationError',
        message: error.name,
        details: error.details.map((detail) => {
          return detail.message;
        })
      }
    });
  }
}
module.exports = {
  ValidationError: ValidationError
};
