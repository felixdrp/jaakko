'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var GroupView = function (_Component) {
  (0, _inherits3.default)(GroupView, _Component);

  function GroupView() {
    (0, _classCallCheck3.default)(this, GroupView);
    return (0, _possibleConstructorReturn3.default)(this, (GroupView.__proto__ || (0, _getPrototypeOf2.default)(GroupView)).apply(this, arguments));
  }

  (0, _createClass3.default)(GroupView, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var context = this.context;
      var palette = context.muiTheme.palette;
      var style = {
        centerIcon: {
          color: '#6c6c6c',
          position: 'relative',
          top: 6,
          marginLeft: 7,
          marginRight: 7
        }
      };
      var buttonLabel = _react2.default.createElement(
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
          'Group ',
          props.groupId,
          _react2.default.createElement(_personOutline2.default, {
            style: (0, _extends3.default)({}, style.centerIcon)
          }),
          props.accountsNumber,
          _react2.default.createElement(
            'span',
            {
              style: {
                color: '#6c6c6c',
                marginLeft: 10
              }
            },
            'Accounts'
          ),
          _react2.default.createElement(
            'span',
            {
              style: {
                marginLeft: 5
              }
            },
            'Type ',
            props.groupType
          )
        ),
        _react2.default.createElement(_svgIcons.NavigationCancel, {
          onClick: function onClick(e) {
            e.nativeEvent.preventDefault();props.removeGroup(props.groupId);
          },
          style: (0, _extends3.default)({}, style.centerIcon, {
            float: 'right'
          })
        })
      );
      // console.log(context)
      return _react2.default.createElement(
        _Card.Card,
        {
          style: {
            width: 460,
            paddingBottom: 15,
            margin: 10
          }
        },
        _react2.default.createElement(
          _RaisedButton2.default
          // Group main button
          ,
          { onClick: props.assignToGroup,
            backgroundColor: '#f59999',
            style: {
              height: 36,
              minWidth: '95%',
              margin: '2.5%'
            }
          },
          buttonLabel
        ),
        'Group ',
        props.groupId,
        _react2.default.createElement(
          'div',
          {
            // Group 1 Chips
            style: {
              display: 'flex',
              flexWrap: 'wrap',
              minWidth: '95%',
              margin: '2.5%'
            }
          },
          props.accounts.list.map(function (accountId) {
            return _react2.default.createElement(
              _Chip2.default,
              {
                key: accountId,
                backgroundColor: props.accounts[accountId].selected ? palette.chipSelected : palette.chip,
                onTouchTap: function onTouchTap(e) {
                  return props.selectionHandler(accountId, e.nativeEvent);
                },
                onRequestDelete: function onRequestDelete(e) {
                  return props.unassignAccount(accountId);
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
    }
  }]);
  return GroupView;
}(_react.Component);

GroupView.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = GroupView;
//# sourceMappingURL=group-view.js.map
