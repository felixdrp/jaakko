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

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GroupAutomatic).call(this));

    _this.state = {
      accounts: {},
      groups: {},
      selection: []
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(GroupAutomatic, [{
    key: 'render',
    value: function render() {
      var style = {
        iconGroup: {
          // color: '#565555',
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
      var unassignedAccounts = {
        list: []
      };

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
            _FloatingActionButton2.default,
            { mini: true, style: {} },
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
            '1'
          ),
          _react2.default.createElement(
            _FloatingActionButton2.default,
            { mini: true, style: {} },
            _react2.default.createElement(_add2.default, null)
          ),
          _react2.default.createElement(
            _RaisedButton2.default
            // Group main button
            // onClick={}
            ,
            { backgroundColor: '#efefef',
              style: {
                height: 36,
                marginLeft: 45,
                position: 'relative',
                bottom: 10
              }
            },
            'Create'
          )
        ),
        _react2.default.createElement(_group2.default, { style: style.iconGroup }),
        ' ',
        _react2.default.createElement(_personOutline2.default, { style: style.iconAccount }),
        ' ',
        _react2.default.createElement(_personOutline2.default, { style: style.iconAccount })
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
//# sourceMappingURL=group-automatic.js.map
