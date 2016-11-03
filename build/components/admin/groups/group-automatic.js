'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _group = require('material-ui/svg-icons/social/group');

var _group2 = _interopRequireDefault(_group);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _remove = require('material-ui/svg-icons/content/remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupAutomatic = function (_Component) {
  (0, _inherits3.default)(GroupAutomatic, _Component);

  function GroupAutomatic() {
    (0, _classCallCheck3.default)(this, GroupAutomatic);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupAutomatic.__proto__ || (0, _getPrototypeOf2.default)(GroupAutomatic)).call(this));

    _this.state = {
      accounts: {},
      groups: {},
      selection: [],
      numberGroups: 0
    };

    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(GroupAutomatic, [{
    key: 'createGroups',
    value: function createGroups(e) {
      if (this.state.numberGroups > 0) {
        this.props.automateGroupCreation(this.state.numberGroups);
      }
    }
  }, {
    key: 'removeGroup',
    value: function removeGroup(e) {
      if (this.state.numberGroups > 0) {
        this.setState({ numberGroups: this.state.numberGroups - 1 });
      }
    }
  }, {
    key: 'addGroup',
    value: function addGroup(e) {
      this.setState({ numberGroups: this.state.numberGroups + 1 });
    }
  }, {
    key: 'drawGroups',
    value: function drawGroups(g, a) {

      var baseA = Math.floor(a / g);
      var orderedGroupsAndAccounts = [];

      for (var i = 0; i < g; i++) {
        orderedGroupsAndAccounts.push(baseA);
      }

      for (var _i = 0; _i < a % g; _i++) {
        orderedGroupsAndAccounts[_i] += 1;
      }

      return orderedGroupsAndAccounts;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        iconGroup: {
          height: 33,
          width: 35,
          marginRight: 10
        },
        iconAccount: {
          height: 33,
          width: 31
        }
      };
      var props = this.props;
      var st = this.state;
      var unassignedAccounts = {
        list: []
      };
      var accounts = props.accounts || { list: [] };

      var groupsProto = this.drawGroups(st.numberGroups, accounts.list.length);

      return _react2.default.createElement(
        'div',
        {
          style: {
            margin: '2.5%',
            marginTop: 15,
            marginBottom: 15
          }
        },
        _react2.default.createElement(
          'div',
          {
            style: {
              margin: '2.5%',
              marginTop: 15,
              marginBottom: 30
            }
          },
          _react2.default.createElement(
            _FloatingActionButton2.default

            ,
            { mini: true,
              style: {},
              onClick: function onClick(e) {
                return _this2.removeGroup(e);
              }
            },
            _react2.default.createElement(_remove2.default, null)
          ),
          _react2.default.createElement(
            'span',
            {
              style: {
                margin: 25,
                fontSize: '-webkit-xxx-large',
                fontWeight: 400,
                fontFamily: 'monospace'
              }
            },
            st.numberGroups
          ),
          _react2.default.createElement(
            _FloatingActionButton2.default,
            { mini: true,
              style: {},
              onClick: function onClick(e) {
                return _this2.addGroup(e);
              }
            },
            _react2.default.createElement(_add2.default, null)
          ),
          _react2.default.createElement(
            _RaisedButton2.default
            ,
            { onClick: function onClick(e) {
                return _this2.createGroups(e);
              },
              backgroundColor: '#efefef',
              style: {
                height: 36,
                marginLeft: 45,
                position: 'relative',
                bottom: 10
              }
            },
            _react2.default.createElement(
              'span',
              {
                style: {
                  paddingLeft: 15,
                  paddingRight: 15
                }
              },
              'Create Groups'
            )
          )
        ),

        groupsProto.map(function (groupAccountsLength, index) {
          return _react2.default.createElement(
            'div',
            { key: index },
            _react2.default.createElement(_group2.default, { style: style.iconGroup }),

            Array(groupAccountsLength).fill('').map(function (ignored, index) {
              return _react2.default.createElement(_personOutline2.default, { key: index, style: style.iconAccount });
            })
          );
        })
      );
    }
  }]);
  return GroupAutomatic;
}(_react.Component);

GroupAutomatic.propTypes = {
  groups: _react.PropTypes.object,
  unassignedAccounts: _react.PropTypes.object
};
GroupAutomatic.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = GroupAutomatic;