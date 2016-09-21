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

var _reactRedux = require('react-redux');

var _queryActions = require('../../websocket-message/query-actions');

var _serverActions = require('../../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SurveyContainer = function (_Component) {
  (0, _inherits3.default)(SurveyContainer, _Component);

  function SurveyContainer() {
    (0, _classCallCheck3.default)(this, SurveyContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SurveyContainer.__proto__ || (0, _getPrototypeOf2.default)(SurveyContainer)).call(this));

    _this.state = {
      accounts: {},
      groups: {},
      selection: [],
      payload: 'some info'
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(SurveyContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // Load the study information
      // Ask for the information to the server
      // this.context.websocket.send( wsSurveyStateGet(this.props.account.email) )
      // Take the payload directly from the session-data file.
      // setTimeout(() => {console.log('didMount> ' + this.state.payload);this.setState({payload: 'some more info!!'});}, 4000)
      setTimeout(function () {
        console.log('didMount> ' + _this2.state.payload);_this2.submitInfo({ payload: 'some more info!!' });
      }, 4000);
      this.setState({ start: Date.now() });
    }
  }, {
    key: 'submitInfo',
    value: function submitInfo(infoObject) {
      var props = this.props;
      this.context.websocket.send((0, _serverActions.wsSubmitSurveyInfo)((0, _extends3.default)({
        accountId: 'account' in props ? props.account.email || 'unassigned' : '',
        startTimestamp: this.state.start,
        endTimestamp: Date.now()
      }, infoObject)));
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexWrap: 'wrap'
          }
        },
        this.props.children && _react2.default.cloneElement(this.props.children, {
          payload: this.state.payload,
          submit: function submit(infoToSubmit) {
            return console.log(infoToSubmit);
          }
        })
      );
    }
  }]);
  return SurveyContainer;
}(_react.Component);

SurveyContainer.propTypes = {
  // groups: PropTypes.object,
  // accounts: PropTypes.object,
};
SurveyContainer.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired,
  websocket: _react.PropTypes.object
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    account: state.account
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SurveyContainer);
//# sourceMappingURL=survey-container.js.map
