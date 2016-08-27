'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Chip = require('material-ui/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnassignedView = function UnassignedView(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_RaisedButton2.default
    // Unassigned Accounts
    , { label: _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_personOutline2.default, { style: {
            color: '#6c6c6c',
            position: 'relative',
            top: 6,
            marginRight: 7
          } }),
        '10',
        _react2.default.createElement(
          'span',
          {
            style: {
              color: '#6c6c6c',
              marginLeft: 15
            }
          },
          'Unassigned Accounts'
        )
      ),
      onClick: function onClick() {
        return console.log('onclik!!!!');
      },
      backgroundColor: '#efefef',
      style: {
        minWidth: '95%',
        margin: '2.5%'
      }
    }),
    _react2.default.createElement(
      'div',
      {
        // Unassigned Chips
        style: {
          minWidth: '95%',
          margin: '2.5%',
          marginTop: 0
        }
      },
      _react2.default.createElement(
        _Chip2.default,
        {
          backgroundColor: '#d6d6d6'
          // onRequestDelete={ () => console.log('onclik!!!!') }
          , onTouchTap: function onTouchTap() {
            return console.log('onclik!!!!');
          },
          style: {
            margin: 3
          }
        },
        'Colored Chip'
      )
    )
  );
};

exports.default = UnassignedView;
//# sourceMappingURL=unassigned-view.js.map
