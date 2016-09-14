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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Slider = require('material-ui/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _colors = require('material-ui/styles/colors');

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  block: {
    display: 'flex'
  },
  radioButton: {
    display: 'inline',
    width: 50
  }
};

var Rater = function (_Component) {
  (0, _inherits3.default)(Rater, _Component);

  function Rater(props) {
    (0, _classCallCheck3.default)(this, Rater);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Rater.__proto__ || (0, _getPrototypeOf2.default)(Rater)).call(this, props));

    _this.setRating = function (rating) {
      //this.setState({currentRating: rating});
      _this.props.raterCallback(_this.props.entryIndex, rating);
    };

    _this.componentWillReceiveProps = function (nextProps) {
      _this.setState({ currentRating: nextProps.currentRating });
    };

    _this.getStar = function (number) {
      var checked = false;
      if (number <= _this.state.currentRating) {
        checked = true;
      }
      return _react2.default.createElement(_Checkbox2.default, {
        key: number,
        checkedIcon: _react2.default.createElement(_svgIcons.ToggleStar, { color: _colors.yellow500 }),
        uncheckedIcon: _react2.default.createElement(_svgIcons.ToggleStarBorder, { color: _colors.yellow500 }),
        label: '',
        checked: checked,
        style: styles.radioButton,
        onClick: function onClick() {
          _this.setRating(number);
        }

      });
    };

    _this.reset = function () {
      _this.setState({ currentRating: 0 });
    };

    _this.state = { currentRating: 0 };
    return _this;
  }

  (0, _createClass3.default)(Rater, [{
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var textColor = this.context.muiTheme.palette.textColor;

      var numberOfStars = 5;

      return _react2.default.createElement(
        'div',
        { style: { display: 'flex' } },
        [1, 2, 3, 4, 5].map(function (number, i) {
          return _this2.getStar(number);
        }),
        _react2.default.createElement(
          _IconButton2.default,
          { tooltip: 'Clear all stars',
            onClick: function onClick() {
              _this2.setRating(-1);
            },
            style: { width: 24, height: 24, margin: 0, padding: 0 }
          },
          _react2.default.createElement(_svgIcons.ContentClear, null)
        )
      );
    }
  }]);
  return Rater;
}(_react.Component);

Rater.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


Rater.propTypes = {}
// addTodo: PropTypes.func.isRequired


//export default Question

;var mapStateToProps = function mapStateToProps(state) {
  return {
    firstName: state.account.firstName
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Rater);
//# sourceMappingURL=rater.js.map
