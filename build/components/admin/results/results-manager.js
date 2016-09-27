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

// groups
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
      // let surveyxMonetaryTypeIndex = this.props.storeSession.session.surveyPath.reduce(
      //   (prev, element, index) => {
      //     // The survey have a monetary value?
      //     if (element.type == 'RESULTS' || element.type == 'MATH_RESULTS') {
      //       prev.push( index )
      //       return prev
      //     }
      //     return prev
      //   },
      //   []
      // )
      //
      // let accounts = this.props.storeSession.accounts.list.map(
      //   ( account, index ) => {
      //     let accountComponent = []
      //     accountComponent.push( <span key={account.email}> {account.firstName} {account.surname} {account.email} </span> )
      //     let moneyData = this.props.storeSession.results.filter(
      //       (element) => element.creator == account && surveyxMonetaryTypeIndex.includes( element. )
      //     )
      //     accountComponent = [
      //       ...accountComponent,
      //       ...this.props.storeSession.reduce(
      //         (prev, current, index) => {
      //           if (  ) {
      //
      //           } else {
      //
      //           }
      //         },
      //         []
      //       )
      //     ]
      //     return <div key={index}> accountComponent </div>
      //   }
      // )

      // let result =


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
        accounts
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


ResultsManager.propTypes = {
  // groups: PropTypes.object,
  // unassignedAccounts: PropTypes.object,
};
ResultsManager.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = ResultsManager;
//# sourceMappingURL=results-manager.js.map
