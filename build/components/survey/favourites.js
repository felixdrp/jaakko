'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _RadioButton = require('material-ui/RadioButton');

var _reactRedux = require('react-redux');

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _rater = require('./rater');

var _rater2 = _interopRequireDefault(_rater);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favourites = function (_Component) {
  (0, _inherits3.default)(Favourites, _Component);

  function Favourites(props) {
    (0, _classCallCheck3.default)(this, Favourites);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Favourites.__proto__ || (0, _getPrototypeOf2.default)(Favourites)).call(this, props));

    _this.rater = function (index, rating) {
      var data = _this.state.data;
      var favourites = _this.state.favourites;

      if (rating == -1) {
        for (var f in favourites) {
          if (favourites[f] == index) {
            favourites[f] = undefined;
            _this.currentRating = 0;
            data[index].rating = 0;
          }
        }
      } else {
        if (favourites[rating] == undefined) {
          //  debugger
          for (var f in favourites) {
            if (favourites[f] == index) {
              favourites[f] = undefined;
              _this.currentRating = 0;
              data[index].rating = 0;
            }
          }
          data[index].rating = rating;
          _this.currentRating = rating;
          favourites[rating] = index;
        }
      }

      _this.setState({ data: data });
      _this.setState({ favourites: favourites });
    };

    _this.gatherData = function () {

      console.log((0, _stringify2.default)(_this.state));
      return _this.state;
    };

    _this.alerthing = function () {
      alert('boom');
    };

    _this.state = { favourites: new Array(6) };
    return _this;
  }

  (0, _createClass3.default)(Favourites, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        data: nextProps.ideas || []
      });
    }
  }, {
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


      var title = 'Favourites task';
      var text = 'Rate the following works, and show which ones are your favourites:';

      var data = this.state.data || [];
      var raters = new Array(data.length);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          {
            style: {
              padding: 30,
              margin: '2% 15% 15%',
              minWidth: 900
            }
          },
          _react2.default.createElement(_Card.CardHeader, {
            title: title,
            titleStyle: {
              fontSize: 24,
              color: textColor
            }
          }),
          _react2.default.createElement(
            _Card.CardText,
            {
              style: {
                paddingTop: 0
              }
            },
            text.split('\n').map(function (item, i) {
              return _react2.default.createElement(
                'div',
                { key: i, style: { marginBottom: 10 } },
                item
              );
            })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(_timer2.default, { limitTime: 10, timerCallback: function timerCallback() {
              return _this2.props.submit(_this2.gatherData());
            } }),
          data.map(function (entry, i) {
            return _react2.default.createElement(
              'div',
              { key: i, style: { padding: 5, display: 'flex' } },
              _react2.default.createElement(
                _Card.Card,
                { style: { paddingTop: '0%', fontWeight: 800 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  i + '.'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                { style: { width: 460 } },
                _react2.default.createElement(
                  _Card.CardHeader,
                  { style: { padding: 8 } },
                  entry.title
                ),
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  entry.description
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 20 } },
                  _react2.default.createElement(_rater2.default, { entryIndex: i, raterCallback: _this2.rater, currentRating: entry.rating })
                )
              )
            );
          })
        )
      );
    }
  }]);
  return Favourites;
}(_react.Component);

Favourites.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


Favourites.propTypes = {}
// addTodo: PropTypes.func.isRequired


//export default Question

;var mapStateToProps = function mapStateToProps(state) {
  return {
    firstName: state.account.firstName,
    ideas: state.task.payload ? state.task.payload.ideas : []

  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Favourites);
//# sourceMappingURL=favourites.js.map
