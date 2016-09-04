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

var UnassignedView = function UnassignedView(props, context) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _RaisedButton2.default
      // Unassigned Accounts
      ,
      { onClick: props.unassignSelectedAccounts,
        backgroundColor: '#efefef',
        style: {
          height: 36,
          minWidth: '95%',
          margin: '2.5%',
          marginTop: 15,
          marginBottom: 15
        }
      },
      _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_personOutline2.default, { style: {
            color: '#6c6c6c',
            position: 'relative',
            top: 6,
            marginRight: 7
          } }),
        props.accounts ? props.accounts.list.length : 0,
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
      )
    ),
    _react2.default.createElement(
      'div',
      {
        // Unassigned Chips
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: '95%',
          margin: '2.5%',
          marginTop: 0,
          marginBottom: 15
        }
      },
      props.accounts.list.map(function (accountId) {
        return _react2.default.createElement(
          _Chip2.default,
          {
            key: accountId,
            backgroundColor: props.accounts[accountId].selected ? context.muiTheme.palette.chipSelected : context.muiTheme.palette.chip,
            onTouchTap: function onTouchTap(e) {
              return props.selectionHandler(accountId, e.nativeEvent);
            },
            style: {
              margin: 3
            }
          },
          _react2.default.createElement(
            'span',
            {
              style: {
                fontWeight: 500,
                marginRight: 8,
                fontFamily: 'monospace'
              }
            },
            props.accounts[accountId].firstName
          ),
          props.accounts[accountId].email
        );
      })
    )
  );
};
UnassignedView.contextTypes = { muiTheme: _react2.default.PropTypes.object };

exports.default = UnassignedView;
//# sourceMappingURL=unassigned-view.js.map
