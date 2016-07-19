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
 * <ButtonLoginWithTwitter />
 * ```
 */

var buttonLoginWithTwitter = function buttonLoginWithTwitter(props) {
  return _react2.default.createElement(_buttonLoginWithBase2.default, {
    width: props.width,
    brandName: 'Twitter',
    brandLogo: _react2.default.createElement(
      'div',
      {
        style: {
          display: 'inline-block',
          height: 18,
          margin: 3,
          marginTop: 2,
          marginRight: 6,
          padding: 0,
          width: 18
        }
      },
      _react2.default.createElement('i', {
        className: 'fa fa-twitter',
        style: {
          position: 'relative',
          bottom: -2,
          left: 2,
          fontSize: 20,
          color: 'rgba(25, 182, 233, 0.8)',
          textShadow: '0.5px 0px 2px #def, 0 0 0 #000, 1px 1px 1px #f6fbff'
        }
      })
    )
  });
};

exports.default = buttonLoginWithTwitter;
//# sourceMappingURL=buttonLoginWithTwitter.js.map
