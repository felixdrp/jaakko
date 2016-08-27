'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Chip = require('material-ui/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _group = require('material-ui/svg-icons/social/group');

var _group2 = _interopRequireDefault(_group);

var _groupAdd = require('material-ui/svg-icons/social/group-add');

var _groupAdd2 = _interopRequireDefault(_groupAdd);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupView = function GroupView(props, context) {
  var style = {
    centerIcon: {
      color: '#6c6c6c',
      position: 'relative',
      top: 6,
      marginLeft: 7,
      marginRight: 7
    },
    position1: {}
  };
  // console.log(context)
  return _react2.default.createElement(
    _Card.Card,
    {
      style: {
        width: 460,
        paddingBottom: 15
      }
    },
    _react2.default.createElement(_RaisedButton2.default
    // Group main button
    , { label: _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          {
            style: {
              float: 'left',
              paddingLeft: 15
            }
          },
          _react2.default.createElement(_group2.default, {
            style: (0, _extends3.default)({}, style.centerIcon, {
              marginLeft: 0
            })
          }),
          'Group 1',
          _react2.default.createElement(_personOutline2.default, {
            style: (0, _extends3.default)({}, style.centerIcon)
          }),
          '10',
          _react2.default.createElement(
            'span',
            {
              style: {
                color: '#6c6c6c',
                marginLeft: 10
              }
            },
            'Accounts'
          )
        ),
        _react2.default.createElement(_svgIcons.NavigationCancel, {
          onClick: props.removeGroup,
          style: (0, _extends3.default)({}, style.centerIcon, {
            float: 'right'
          })
        })
      ),
      onClick: props.assignToGroup,
      backgroundColor: '#f59999',
      style: {
        minWidth: '95%',
        margin: '2.5%'
      }
    }),
    _react2.default.createElement(
      'div',
      {
        // Group 1 Chips
        style: {
          minWidth: '95%',
          margin: '2.5%'
        }
      },
      _react2.default.createElement(
        _Chip2.default,
        {
          backgroundColor: context.muiTheme.palette.selectionBackground,
          onRequestDelete: function onRequestDelete() {
            return console.log('onclik!!!!');
          },
          onTouchTap: function onTouchTap() {
            return console.log('onclik!!!!');
          },
          style: {
            margin: 4
          }
        },
        'Colored Chip'
      )
    )
  );
};

GroupView.contextTypes = { muiTheme: _react2.default.PropTypes.object };

exports.default = GroupView;
//# sourceMappingURL=group-view.js.map
