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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import GeneralInfoView from './general-info-view'


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

      setTimeout(function () {
        console.log('didMount> ' + _this2.state.payload);_this2.setState({ payload: 'some more info!!' });
      }, 4000);
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
exports.default = SurveyContainer;
//# sourceMappingURL=survey-container.js.map
