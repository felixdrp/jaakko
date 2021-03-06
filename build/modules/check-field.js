'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _error = require('./log/error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check the type of an object of fields (variables)
 *
 * @param {Object} fields An object with multiple fields to check type
 * @param {Object} fieldsOptions An object whose values correspond to different
 * params the input must validate.
 * @returns {null or Object error} Return null if the type is correct or
 * an object error
 */

function checkAll(fields, fieldsOptions) {
  var field = void 0,
      error = void 0;

  for (field in fieldsOptions) {
    // Check types
    if (fieldsOptions[field] && !((fields[field] === null || fields[field] === undefined || fields[field] === '') && fieldsOptions[field].mustHave === false)) {
      error = check(field, fields[field], fieldsOptions[field]);
      if (error !== null && (typeof error === 'undefined' ? 'undefined' : (0, _typeof3.default)(error)) === 'object' && error.type === 'error') {
        return error;
      }
    }

    // Check must have
    if (fieldsOptions[field] && fieldsOptions[field].mustHave === true && (fields[field] === null || fields[field] === undefined || fields[field] === '')) {
      return (0, _error.reportError)('The input field ' + field + ' not valid', 'The field ' + field + ' must have a value.', 'FIELD_UNDEFINED', '7733f0f8-1d80-4c51-99e8-fa659cdd199f');
    }
  }
  return null;
}

/**
 * Check the type of a field (variable)
 *
 * @param {String} fieldName A String with the name of the input.
 * Used to return a meaningful error message.
 * @param {Mixed} input An field or var, to be checked the type.
 * @param {Object} options An object whose values correspond to different
 * params the input must validate.
 * @returns {true or Object error} Return true if the type is correct or
 * an object error
 */

function check(fieldName, input, options) {

  // Check min Length
  if (_validator2.default.isLength(input, { min: options.min }) === false) {
    // console.log(input + ' >>>>>>> ' + JSON.stringify(input,null,2) )

    return (0, _error.reportError)('The input field ' + fieldName + ' not valid', 'The field is too short', 'FIELD_TOO_SHORT', '83527cac-4100-43e6-8ce9-8068c0bccf6a');
  }

  // Check max Length
  if (_validator2.default.isLength(input, { max: options.max }) === false) {
    return (0, _error.reportError)('The input field ' + fieldName + ' not valid', 'The field is too long', 'FIELD_TOO_LONG', '4b7917ff-1dbe-495d-8ae6-1a9aac25fd9b');
  }

  // Check type
  switch (options.type) {
    case 'alphanumeric':
      if (typeof input !== 'string') {
        return (0, _error.reportError)('The input field ' + fieldName + ' not valid', 'The field ' + fieldName + ' is not a string', 'ALPHANUMERIC_TYPE_NOT_VALID', '1371922c-7f04-4a9c-bfca-3a250de5fdc7');
      }

      if (_validator2.default.isAlphanumeric(input) === false) {
        return (0, _error.reportError)('The input field ' + fieldName + ' not valid', 'The field ' + fieldName + ' constains a not valid character', 'ALPHANUMERIC_TYPE_NOT_VALID', '2aec8e36-d6c6-4c1d-8df3-d4dae6b5cb34');
      }
      break;

    case 'email':
      if (typeof input !== 'string' || _validator2.default.isEmail(input) === false) {
        return (0, _error.reportError)('The input field ' + fieldName + ' is not a valid email', 'The field ' + fieldName + ' is not a valid email', 'EMAIL_NOT_VALID', 'df475ee0-4e7f-436e-8e5f-25316f91f48f');
      }
      break;

    case 'password':
      if (typeof input !== 'string') {
        return (0, _error.reportError)('The input field ' + fieldName + ' not valid', 'The field ' + fieldName + ' is not a string', 'PASSWORD_NOT_VALID', '7102e599-c3f5-4e36-ba49-e057828ea931');
      }
      if (new RegExp('^(?=.*\\d{' + (options.numbers >= 0 ? options.numbers : 0) + ',})' + '(?=.*[a-zA-Z0-9]{1,})' + ('(?=.*[A-Z]{' + (options.capitals >= 0 ? options.capitals : 0) + ',})') + ('(?=.*\\W{' + (options.symbols >= 0 ? options.symbols : 0) + ',})') + ('.{' + (options.min >= 0 ? options.min : 4) + ',}$')).test(input) === false) {
        return (0, _error.reportError)('The input field ' + fieldName + ' not valid', 'The field ' + fieldName + ' not valid', 'PASSWORD_NOT_VALID', '5d4c774e-cfc7-4e73-b240-07def5f224cd');
      }
      break;

    case 'token':
      if (typeof input !== 'string' || _validator2.default.isHexadecimal(input) === false) {
        return (0, _error.reportError)('The input field ' + fieldName + ' is not a valid token', 'The field ' + fieldName + ' is not a valid token', 'TOKEN_NOT_VALID', '468bdda4-7647-4720-8db9-d6a067880215');
      }
      break;
  }

  return true;
}

exports.default = {
  check: check,
  checkAll: checkAll
};
//# sourceMappingURL=check-field.js.map
