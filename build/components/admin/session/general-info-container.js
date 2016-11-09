'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _generalInfoView = require('./general-info-view');

var _generalInfoView2 = _interopRequireDefault(_generalInfoView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeneralInfoContainer = function (_Component) {
  (0, _inherits3.default)(GeneralInfoContainer, _Component);

  function GeneralInfoContainer() {
    (0, _classCallCheck3.default)(this, GeneralInfoContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GeneralInfoContainer.__proto__ || (0, _getPrototypeOf2.default)(GeneralInfoContainer)).call(this));

    _this.state = {
      accounts: {},
      groups: {},
      selection: []
    };

    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(GeneralInfoContainer, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var storeSession = props.storeSession;
      var groupList = { list: [] },
          accounts = '',
          groups = '';

      if ((typeof storeSession === 'undefined' ? 'undefined' : (0, _typeof3.default)(storeSession)) == 'object' && 'groups' in storeSession) {
        groups = storeSession.groups;

        if ((typeof groups === 'undefined' ? 'undefined' : (0, _typeof3.default)(groups)) == 'object' && 'list' in groups) {
          groupList = storeSession.groups;
        }

        accounts = groups.list.reduce(function (prev, groupID) {
          return prev + groups[groupID].accountList.length;
        }, 0);

        groups = groups.list.length;
      }

      return _react2.default.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexWrap: 'wrap'
          }
        },
        _react2.default.createElement(_generalInfoView2.default, {
          accounts: accounts,
          groups: groups,
          groupList: groupList
        })
      );
    }
  }]);
  return GeneralInfoContainer;
}(_react.Component);

GeneralInfoContainer.propTypes = {
};
GeneralInfoContainer.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = GeneralInfoContainer;