'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _buttonLoginWithBase = require('./buttonLoginWithBase');

var _buttonLoginWithBase2 = _interopRequireDefault(_buttonLoginWithBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var buttonLoginWithLinkedin = function buttonLoginWithLinkedin(props) {
  return _react2.default.createElement(_buttonLoginWithBase2.default, {
    width: props.width,
    brandName: 'Linkedin',
    brandLogo: _react2.default.createElement(
      'div',
      {
        style: {
          display: 'inline-block',
          backgroundColor: '#0077B5',
          borderRadius: 2,
          height: 18,
          margin: 4,
          marginRight: 6,
          padding: 0,
          width: 18,
          color: 'white'
        }
      },
      _react2.default.createElement('i', {
        className: 'fa fa-linkedin',
        style: {
          position: 'relative',
          left: 2,
          fontSize: 16.4
        }
      })
    )
  });
};

exports.default = buttonLoginWithLinkedin;