'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _playArrow = require('material-ui/svg-icons/av/play-arrow');

var _playArrow2 = _interopRequireDefault(_playArrow);

var _done = require('material-ui/svg-icons/action/done');

var _done2 = _interopRequireDefault(_done);

var _accountsPerGroupView = require('./accounts-per-group-view');

var _accountsPerGroupView2 = _interopRequireDefault(_accountsPerGroupView);

var _sessionData = require('../../../session-data');

var _sessionData2 = _interopRequireDefault(_sessionData);

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

      var accountsPerSurvey = [];
      var sessionTrack = [];

      var filterAccountByGroup = null;

      if ((typeof storeSession === 'undefined' ? 'undefined' : (0, _typeof3.default)(storeSession)) == 'object' && 'groups' in storeSession) {
        groups = storeSession.groups;

        if ((typeof groups === 'undefined' ? 'undefined' : (0, _typeof3.default)(groups)) == 'object' && 'list' in groups) {
          groupList = storeSession.groups;
        }
        // Number of accounts
        accounts = groups.list.reduce(function (prev, groupID) {
          return prev + groups[groupID].accountList.length;
        }, 0);

        // Link survey to account
        storeSession.accounts.list.forEach(function (account) {
          var acc = storeSession.accounts[account];
          if (accountsPerSurvey[acc.surveyPointer] == undefined) {
            accountsPerSurvey[acc.surveyPointer] = [];
          }

          accountsPerSurvey[acc.surveyPointer].push(acc.email);
        });

        // Add type to the finished surveys.
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(accountsPerSurvey), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var survey = _step.value;

            if (survey == 'undefined') {
              if (filterAccountByGroup == null) {
                sessionTrack.push(_react2.default.createElement(_done2.default, { style: { fill: 'green' } }));
              }
            } else {
              filterAccountByGroup = survey.reduce(function (prev, actual) {
                var group = storeSession.accounts[actual].group;
                if (prev.list.includes(group)) {
                  prev[group].push(actual);
                } else {
                  prev.list.push(group);
                  prev[group] = [actual];
                }
                return prev;
              }, { list: [] });

              sessionTrack.push(_react2.default.createElement(
                'span',
                null,
                filterAccountByGroup.list.map(function (groupId) {
                  return _react2.default.createElement(_accountsPerGroupView2.default, {
                    key: groupId,
                    groupName: groupId,
                    groupType: groupId == 'unassigned' ? 'unassigned' : storeSession.groups[groupId].type,
                    groupAccounts: filterAccountByGroup[groupId]
                  });
                })
              ));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        console.log(accountsPerSurvey);
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
            _react2.default.createElement(
              'span',
              null,
              ' ',
              step.type,
              ' '
            ),
            sessionTrack[index] ? sessionTrack[index] : ''
          );
        })
      );
    }
  }]);
  return SessionTrackerContainer;
}(_react.Component);

SessionTrackerContainer.propTypes = {
  // groups: PropTypes.object,
  // accounts: PropTypes.object,
};
SessionTrackerContainer.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = SessionTrackerContainer;
//# sourceMappingURL=session-tracker-container.js.map
