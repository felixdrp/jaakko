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

var _sessionData = require('../../../session-data');

var _sessionData2 = _interopRequireDefault(_sessionData);

var _playArrow = require('material-ui/svg-icons/av/play-arrow');

var _playArrow2 = _interopRequireDefault(_playArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SessionTrackerContainer = function (_Component) {
  (0, _inherits3.default)(SessionTrackerContainer, _Component);

  function SessionTrackerContainer() {
    (0, _classCallCheck3.default)(this, SessionTrackerContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SessionTrackerContainer.__proto__ || (0, _getPrototypeOf2.default)(SessionTrackerContainer)).call(this));

    _this.state = {
      accounts: {},
      groups: {},
      selection: []
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(SessionTrackerContainer, [{
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
            flexDirection: 'column',
            paddingLeft: 40
          }
        },
        _sessionData2.default.surveyPath.map(function (step, index) {
          return _react2.default.createElement(
            'div',
            { key: index },
            _react2.default.createElement(_playArrow2.default, null),
            step.type
          );
        })
      );
    }
  }]);
  return SessionTrackerContainer;
}(_react.Component);
// import GeneralInfoView from './general-info-view'


SessionTrackerContainer.propTypes = {
  // groups: PropTypes.object,
  // accounts: PropTypes.object,
};
SessionTrackerContainer.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = SessionTrackerContainer;
//# sourceMappingURL=session-tracker-container.js.map
