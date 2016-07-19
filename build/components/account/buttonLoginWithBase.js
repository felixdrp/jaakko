'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that render a login with Facebook button.
 *
 * Example usage :
 * ```
 * <ButtonLoginWithBase width={200} brandLogo={ {JSX} } brandName="Acme Ltd." />
 * ```
 */

var buttonLoginWithBase = function buttonLoginWithBase(props) {
  return _react2.default.createElement(
    'div',
    {
      style: {
        background: 'linear-gradient(#fdfdfd, #DEDEDE)',
        border: '1px solid #CCCCCC',
        borderRadius: 4,
        boxShadow: '0 1px 0 #fff',
        cursor: 'pointer',
        fill: '#444',
        height: 28,
        margin: 0,
        padding: 0,
        width: (props.width || 160) + 'px',
        color: '#333333'
      },
      alt: "Sign in with " + props.brandName,
      title: "Sign in with " + props.brandName
    },
    _react2.default.createElement(
      'div',
      {
        style: {
          display: 'inline-block',
          margin: '0px 4px'
        }
      },
      props.brandLogo
    ),
    _react2.default.createElement(
      'span',
      {
        style: {
          // Remove link underline
          display: 'inline-block',
          fontFamily: 'roboto',
          fontSize: '12.6px',
          // fontWeight: 'bold',
          color: '#4e4e4e',
          textShadow: '1px 1px #fff'
        }
      },
      'Sign in with ',
      props.brandName
    )
  );
};

exports.default = buttonLoginWithBase;
//# sourceMappingURL=buttonLoginWithBase.js.map
