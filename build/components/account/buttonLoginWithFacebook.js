'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _buttonLoginWithBase = require('./buttonLoginWithBase');

var _buttonLoginWithBase2 = _interopRequireDefault(_buttonLoginWithBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that render a login with Facebook button.
 *
 * Example usage :
 * ```
 * <ButtonLoginWithFacebook />
 * ```
 */

var buttonLoginWithFacebook = function buttonLoginWithFacebook(props) {
  return _react2.default.createElement(_buttonLoginWithBase2.default, {
    width: props.width,
    brandName: 'Facebook',
    brandLogo: _react2.default.createElement(
      'div',
      {
        style: {
          display: 'inline-block',
          backgroundColor: '#3B5998',
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
        className: 'fa fa-facebook',
        style: {
          position: 'relative',
          bottom: -2,
          left: 7
        }
      })
    )
  });
};

exports.default = buttonLoginWithFacebook;
//# sourceMappingURL=buttonLoginWithFacebook.js.map
