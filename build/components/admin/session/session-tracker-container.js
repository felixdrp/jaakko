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

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _playArrow = require('material-ui/svg-icons/av/play-arrow');

var _playArrow2 = _interopRequireDefault(_playArrow);

var _done = require('material-ui/svg-icons/action/done');

var _done2 = _interopRequireDefault(_done);

var _accountsPerGroupView = require('./accounts-per-group-view');

var _accountsPerGroupView2 = _interopRequireDefault(_accountsPerGroupView);

var _sessionData = require('../../../session-data');

var _sessionData2 = _interopRequireDefault(_sessionData);

var _surveyTypes = require('../../survey/survey-types');

var _serverActions = require('../../../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SessionTrackerContainer = function (_Component) {
  (0, _inherits3.default)(SessionTrackerContainer, _Component);

  function SessionTrackerContainer() {
    (0, _classCallCheck3.default)(this, SessionTrackerContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SessionTrackerContainer.__proto__ || (0, _getPrototypeOf2.default)(SessionTrackerContainer)).call(this));

    _this.handleTouchTap = function (event) {
      // This prevents ghost click.
      event.preventDefault();
      var openMenus = _this.state.openMenus.slice();
      var anchorEl = _this.state.anchorEl.slice();
      var index = Number(event.currentTarget.attributes.getNamedItem('name').value);

      openMenus[index] = true;
      anchorEl[index] = event.currentTarget;

      _this.setState({
        openMenus: openMenus,
        anchorEl: anchorEl
      });
    };

    _this.handleRequestClose = function (index) {
      var openMenus = _this.state.openMenus.slice();

      openMenus[index] = false;
      _this.setState({
        openMenus: openMenus
      });
    };

    _this.state = {
      // accounts: { },
      // groups: { },
      selection: [],

      openMenus: [],
      anchorEl: []
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(SessionTrackerContainer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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

            if (survey == undefined || survey == 'undefined') {
              if (filterAccountByGroup == null) {
                sessionTrack.push(_react2.default.createElement(_done2.default, { style: { fill: 'green' } }));
              } else {
                sessionTrack.push(_react2.default.createElement('span', null));
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

          // console.log(accountsPerSurvey)
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
            step.type == _surveyTypes.AWAIT ? _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                {
                  name: index,
                  style: {
                    color: '#6c6c6c',
                    cursor: 'pointer'
                  },
                  onTouchTap: _this2.handleTouchTap
                },
                _react2.default.createElement(
                  'span',
                  null,
                  ' ',
                  step.type,
                  ' '
                )
              ),
              _react2.default.createElement(
                _Popover2.default,
                {
                  name: index,
                  open: _this2.state.openMenus[index] || false,
                  anchorEl: _this2.state.anchorEl[index],
                  anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                  targetOrigin: { horizontal: 'left', vertical: 'top' },
                  onRequestClose: function onRequestClose() {
                    return _this2.handleRequestClose(index);
                  }
                },
                _react2.default.createElement(
                  _Menu2.default,
                  null,
                  _react2.default.createElement(
                    _MenuItem2.default,
                    {
                      onClick: function onClick() {
                        // console.log('mlkkkk' + index);
                        if (accountsPerSurvey[index] != undefined) {
                          _this2.props.wsSession.send((0, _serverActions.wsSurveyStepAll)(accountsPerSurvey[index]));
                          // console.log(accountsPerSurvey[index]);
                        }
                        _this2.handleRequestClose(index);
                      }
                    },
                    _react2.default.createElement(_playArrow2.default, null),
                    'Continue'
                  )
                )
              )
            ) : _react2.default.createElement(
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
