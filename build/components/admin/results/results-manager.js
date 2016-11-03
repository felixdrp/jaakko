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

var _Card = require('material-ui/Card');

var _Table = require('material-ui/Table');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _class = require('material-ui/svg-icons/action/class');

var _class2 = _interopRequireDefault(_class);

var _language = require('material-ui/svg-icons/action/language');

var _language2 = _interopRequireDefault(_language);

var _group = require('material-ui/svg-icons/social/group');

var _group2 = _interopRequireDefault(_group);

var _groupAdd = require('material-ui/svg-icons/social/group-add');

var _groupAdd2 = _interopRequireDefault(_groupAdd);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _developerBoard = require('material-ui/svg-icons/hardware/developer-board');

var _developerBoard2 = _interopRequireDefault(_developerBoard);

var _showChart = require('material-ui/svg-icons/editor/show-chart');

var _showChart2 = _interopRequireDefault(_showChart);

var _localAtm = require('material-ui/svg-icons/maps/local-atm');

var _localAtm2 = _interopRequireDefault(_localAtm);

var _memory = require('material-ui/svg-icons/hardware/memory');

var _memory2 = _interopRequireDefault(_memory);

var _modeEdit = require('material-ui/svg-icons/editor/mode-edit');

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

require('../../../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResultsManager = function (_Component) {
  (0, _inherits3.default)(ResultsManager, _Component);

  function ResultsManager() {
    (0, _classCallCheck3.default)(this, ResultsManager);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResultsManager.__proto__ || (0, _getPrototypeOf2.default)(ResultsManager)).call(this));

    _this.state = {};

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(ResultsManager, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var surveyxMonetaryTypeIndex = [];
      var surveyxMonetaryTypeIndexType = [];
      var accountsMonetary = [];
      var accountsMonetaryTable = [];

      var columnWidthStyle = '20%';

      if (this.props.storeSession && 'session' in this.props.storeSession) {
        surveyxMonetaryTypeIndex = this.props.storeSession.session.surveyPath.reduce(function (prev, element, index) {
          // The survey have a monetary value?
          if (element.type == 'RESULTS' || element.type == 'MATH_RESULTS') {
            prev.push(index);
            return prev;
          }
          return prev;
        }, []);

        surveyxMonetaryTypeIndexType = surveyxMonetaryTypeIndex.map(function (surveyIndex) {
          return _this2.props.storeSession.session.surveyPath[surveyIndex].type;
        });

        accountsMonetaryTable = this.props.storeSession.accounts.list.reduce(function (prev, accountId, index) {
          var account = _this2.props.storeSession.accounts[accountId];
          var accountComponent = [];
          var moneyData = [];
          var taskNumber = 0;
          var total = 0;

          accountComponent.push(_react2.default.createElement(
            _Table.TableRowColumn,
            { key: account.email + 0, style: { width: columnWidthStyle } },
            account.firstName,
            ' ',
            account.surname,
            ' Group ',
            account.group
          ));

          accountComponent.push(_react2.default.createElement(
            _Table.TableRowColumn,
            { key: account.email + 1, style: { width: 20 } },
            _this2.props.storeSession.groups[account.group].type
          ));

          moneyData = _this2.props.storeSession.results.surveyInfo.filter(function (element) {
            return element.accountId == accountId && surveyxMonetaryTypeIndex.includes(element.surveyId);
          });

          moneyData.forEach(function (current, index2) {
            var data = void 0;
            if (current.surveyType == 'RESULTS') {
              data = current.surveyData.data.find(function (element) {
                return element.account.email == current.surveyData.currentUserEmail;
              });
              accountComponent.push(_react2.default.createElement(
                _Table.TableRowColumn,
                {
                  key: account.email + index2 + 1,
                  style: {
                    marginLeft: 10
                  }
                  // Task Round {taskNumber}
                },
                'Rank ',
                data.rank,
                ' Score ',
                data.score,
                ' Pay ',
                data.pay
              ));
              taskNumber += 1;
              total += data.pay;
            } else {
              data = current.surveyData.data.find(function (element) {
                return element.account.email == current.surveyData.currentUserEmail;
              });
              accountComponent.push(_react2.default.createElement(
                _Table.TableRowColumn,
                {
                  key: account.email + index2 + 1,
                  style: {
                    marginLeft: 10
                  }
                  // Math Round
                },
                'Rank ',
                data.rank,
                ' Score ',
                data.mathScore,
                ' Pay ',
                data.pay
              ));
              accountComponent.push(_react2.default.createElement(
                _Table.TableRowColumn,
                {
                  key: account.email + index2 + 2,
                  style: {
                    marginLeft: 10
                  }
                },
                total + data.pay
              ));
            }
          });

          prev.push(_react2.default.createElement(
            _Table.TableRow,
            { key: index },
            ' ',
            accountComponent,
            ' '
          ));

          return prev;
        }, []);

        accountsMonetaryTable = _react2.default.createElement(
          _Table.Table,
          null,
          _react2.default.createElement(
            _Table.TableHeader,
            null,
            _react2.default.createElement(
              _Table.TableRow,
              null,
              _react2.default.createElement(
                _Table.TableHeaderColumn,
                { style: { width: columnWidthStyle } },
                'Account Info'
              ),
              _react2.default.createElement(
                _Table.TableHeaderColumn,
                { style: { width: 20 } },
                'Type'
              ),
              surveyxMonetaryTypeIndexType.map(function (type, index) {
                if (type == 'RESULTS') {
                  return _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    { key: 'task' + index },
                    'Task Round ',
                    index
                  );
                } else {
                  return _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    { key: 'math' + index },
                    'Math Round ',
                    index
                  );
                }
              }),
              _react2.default.createElement(
                _Table.TableHeaderColumn,
                null,
                'Total'
              )
            )
          ),
          _react2.default.createElement(
            _Table.TableBody,
            null,
            accountsMonetaryTable
          )
        );
      }

      var style = {
        gray: {
          color: '#565555'
        }
      };

      return _react2.default.createElement(
        _Card.Card,
        {
          style: {
            paddingBottom: 20
          }
        },
        _react2.default.createElement(_Card.CardHeader, {
          title: _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_showChart2.default, null),
            ' Results manager '
          ),
          subtitle: 'Results manager'
        }),
        _react2.default.createElement(_Card.CardHeader, {
          title: _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_localAtm2.default, null),
            ' Results manager '
          )
        }),
        accountsMonetaryTable
      );
    }
  }]);
  return ResultsManager;
}(_react.Component);
//
// import GeneralInfoContainer from './general-info-container';
// import SessionTrackerContainer from './session-tracker-container';


// Icons

// import FlatButton from 'material-ui/FlatButton';


// groups


ResultsManager.propTypes = {
  // groups: PropTypes.object,
  // unassignedAccounts: PropTypes.object,
};
ResultsManager.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = ResultsManager;
//# sourceMappingURL=results-manager.js.map
