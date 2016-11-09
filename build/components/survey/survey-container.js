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

var _sessionData = require('../../session-data');

var _sessionData2 = _interopRequireDefault(_sessionData);

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

    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(SurveyContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getSurveyInfo();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.getSurveyInfo();
    }
  }, {
    key: 'getSurveyInfo',
    value: function getSurveyInfo() {
      var _this2 = this;

      console.log('mooooontttttooooooooooo!!!!!!!!!');
      var getInfo = function getInfo() {
        _this2.context.websocket.send((0, _queryActions.wsSurveyStateGet)(_this2.props.account.email || 'unassigned'));
      };

      if (this.context.websocket.ws.readyState == 0) {
        setTimeout(getInfo, 180);
      } else {
        getInfo();
      }

      this.setState({ start: Date.now() });
    }
  }, {
    key: 'submitInfo',
    value: function submitInfo(infoObject) {
      var props = this.props;
      this.context.websocket.send((0, _serverActions.wsSubmitSurveyInfo)({
        accountId: 'account' in props ? props.account.email || 'unassigned' : '',
        startTimestamp: this.state.start,
        endTimestamp: Date.now(),
        surveyData: infoObject
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

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
          payload: (0, _extends3.default)({}, this.state.payload, { parentProps: this.props }),
          submit: function submit(infoToSubmit) {
            return _this3.submitInfo(infoToSubmit);
          }
        })
      );
    }
  }]);
  return SurveyContainer;
}(_react.Component);

SurveyContainer.propTypes = {
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