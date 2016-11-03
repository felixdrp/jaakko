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

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

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
      if (!_this.isSubmitted) {
        _this.props.submit(_this.state);
        _this.isSubmitted = true;
      }
    };

    _this.alerthing = function () {
      alert('boom');
    };

    _this.state = { favourites: new Array(6) };
    _this.isSubmitted = false;
    return _this;
  }

  (0, _createClass3.default)(Favourites, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        data: nextProps.ideas || []
      });
    }

    // componentWillMount (){
    //   var initData = [{"accountId":"rp@p.com","startTimestamp":1474905857189,"endTimestamp":1474905977310,"surveyData":[{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzEyLjU1OQ==","title":"1G","description":"1G","creator":"rp3@p.com","rating":[],"timeSubmitted":1474905729190,"similarTo":[],"similarityHide":true},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzEyLjYxOQ==","title":"1H","description":"1H","creator":"rp4@p.com","rating":[],"timeSubmitted":1474905733349,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzMzLjM0OQ==","title":"1HH","description":"1HH","creator":"rp4@p.com","rating":[],"timeSubmitted":1474905737244,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzI5LjE5","title":"1GG","description":"1GG","creator":"rp3@p.com","rating":[],"timeSubmitted":1474905743242,"similarTo":[],"similarityHide":false}],"surveyId":8,"groupId":1474909224623},{"accountId":"rp3@p.com","startTimestamp":1474905857194,"endTimestamp":1474905977333,"surveyData":[{"group":1474909224594,"groupType":0,"id":"cnAxNDc0OTA5MzEyLjYwNA==","title":"1B","description":"1B","creator":"rpsoft@gmail.com","rating":[],"timeSubmitted":1474909343001,"similarTo":["Z2wxNDc0OTA5MzEyLjYwNQ=="],"similarityHide":false},{"group":1474909224594,"groupType":0,"id":"Z2wxNDc0OTA5MzEyLjYwNQ==","title":"1D","description":"1D","creator":"glucas2@walker.com","rating":[],"timeSubmitted":1474909347311,"similarTo":["cnAxNDc0OTA5MzEyLjYwNA=="],"similarityHide":true},{"group":1474909224594,"groupType":0,"id":"cnAxNDc0OTA5MzQzLjAwMQ==","title":"1BB","description":"1BB","creator":"rpsoft@gmail.com","rating":[],"timeSubmitted":1474909376427,"similarTo":[],"similarityHide":false},{"group":1474909224594,"groupType":0,"id":"Z2wxNDc0OTA5MzQ3LjMxMQ==","title":"1DD","description":"1DD","creator":"glucas2@walker.com","rating":[],"timeSubmitted":1474909378758,"similarTo":[],"similarityHide":false}],"surveyId":8,"groupId":1474909224634},{"accountId":"rp2@p.com","startTimestamp":1474905857193,"endTimestamp":1474905977358,"surveyData":[{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzEyLjU1OQ==","title":"1G","description":"1G","creator":"rp3@p.com","rating":[],"timeSubmitted":1474905729190,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzEyLjYxOQ==","title":"1H","description":"1H","creator":"rp4@p.com","rating":[],"timeSubmitted":1474905733349,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzMzLjM0OQ==","title":"1HH","description":"1HH","creator":"rp4@p.com","rating":[],"timeSubmitted":1474905737244,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzI5LjE5","title":"1GG","description":"1GG","creator":"rp3@p.com","rating":[],"timeSubmitted":1474905743242,"similarTo":[],"similarityHide":false}],"surveyId":8,"groupId":1474909224623},{"accountId":"rp4@p.com","startTimestamp":1474905857197,"endTimestamp":1474905977424,"surveyData":[{"group":1474909224594,"groupType":0,"id":"cnAxNDc0OTA5MzEyLjYwNA==","title":"1B","description":"1B","creator":"rpsoft@gmail.com","rating":[],"timeSubmitted":1474909343001,"similarTo":["Z2wxNDc0OTA5MzEyLjYwNQ=="],"similarityHide":false},{"group":1474909224594,"groupType":0,"id":"Z2wxNDc0OTA5MzEyLjYwNQ==","title":"1D","description":"1D","creator":"glucas2@walker.com","rating":[],"timeSubmitted":1474909347311,"similarTo":["cnAxNDc0OTA5MzEyLjYwNA=="],"similarityHide":false},{"group":1474909224594,"groupType":0,"id":"cnAxNDc0OTA5MzQzLjAwMQ==","title":"1BB","description":"1BB","creator":"rpsoft@gmail.com","rating":[],"timeSubmitted":1474909376427,"similarTo":[],"similarityHide":true},{"group":1474909224594,"groupType":0,"id":"Z2wxNDc0OTA5MzQ3LjMxMQ==","title":"1DD","description":"1DD","creator":"glucas2@walker.com","rating":[],"timeSubmitted":1474909378758,"similarTo":[],"similarityHide":false}],"surveyId":8,"groupId":1474909224634},{"accountId":"glucas2@walker.com","startTimestamp":1474909457577,"endTimestamp":1474909577748,"surveyData":[{"group":1474909224611,"groupType":1,"id":"ZmUxNDc0OTA5MzEyLjYxMQ==","title":"1A","description":"1A","creator":"felixdrp@gmail.com","rating":[],"timeSubmitted":1474909341972,"similarTo":["ZmUxNDc0OTA5MzQxLjk3Mw=="],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"Z2wxNDc0OTA5MzEyLjYwOA==","title":"1C","description":"1C","creator":"glucas@walker.com","rating":[],"timeSubmitted":1474909345262,"similarTo":["ZmUxNDc0OTA5MzQxLjk3Mw=="],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"Z2wxNDc0OTA5MzQ1LjI2Mg==","title":"1CC","description":"1CC","creator":"glucas@walker.com","rating":[],"timeSubmitted":1474909367777,"similarTo":[],"similarityHide":true},{"group":1474909224611,"groupType":1,"id":"ZmUxNDc0OTA5MzQxLjk3Mw==","title":"1AA","description":"1AA","creator":"felixdrp@gmail.com","rating":[],"timeSubmitted":1474909377476,"similarTo":["ZmUxNDc0OTA5MzEyLjYxMQ==","Z2wxNDc0OTA5MzEyLjYwOA=="],"similarityHide":false}],"surveyId":8,"groupId":1474909224594},{"accountId":"rpsoft@gmail.com","startTimestamp":1474909457579,"endTimestamp":1474909577764,"surveyData":[{"group":1474909224611,"groupType":1,"id":"ZmUxNDc0OTA5MzEyLjYxMQ==","title":"1A","description":"1A","creator":"felixdrp@gmail.com","rating":[],"timeSubmitted":1474909341972,"similarTo":[],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"Z2wxNDc0OTA5MzEyLjYwOA==","title":"1C","description":"1C","creator":"glucas@walker.com","rating":[],"timeSubmitted":1474909345262,"similarTo":["Z2wxNDc0OTA5MzQ1LjI2Mg=="],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"Z2wxNDc0OTA5MzQ1LjI2Mg==","title":"1CC","description":"1CC","creator":"glucas@walker.com","rating":[],"timeSubmitted":1474909367777,"similarTo":["Z2wxNDc0OTA5MzEyLjYwOA=="],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"ZmUxNDc0OTA5MzQxLjk3Mw==","title":"1AA","description":"1AA","creator":"felixdrp@gmail.com","rating":[],"timeSubmitted":1474909377476,"similarTo":[],"similarityHide":true}],"surveyId":8,"groupId":1474909224594},{"accountId":"glucas@walker.com","startTimestamp":1474909457579,"endTimestamp":1474909577764,"surveyData":[{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzEyLjU1NA==","title":"1E","description":"1E","creator":"rp@p.com","rating":[],"timeSubmitted":1474905719186,"similarTo":["cnAxNDc0OTA1NzE5LjE4Ng=="],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzEyLjU5Mg==","title":"1F","description":"1F","creator":"rp2@p.com","rating":[],"timeSubmitted":1474905724001,"similarTo":[],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzI0LjAwMQ==","title":"1FF","description":"1FF","creator":"rp2@p.com","rating":[],"timeSubmitted":1474905748039,"similarTo":[],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzE5LjE4Ng==","title":"1EE","description":"1EE","creator":"rp@p.com","rating":[],"timeSubmitted":1474905752712,"similarTo":["cnAxNDc0OTA1NzEyLjU1NA=="],"similarityHide":false}],"surveyId":8,"groupId":1474909224611},{"accountId":"felixdrp@gmail.com","startTimestamp":1474909457577,"endTimestamp":1474909577772,"surveyData":[{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzEyLjU1NA==","title":"1E","description":"1E","creator":"rp@p.com","rating":[],"timeSubmitted":1474905719186,"similarTo":["cnAxNDc0OTA1NzE5LjE4Ng=="],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzEyLjU5Mg==","title":"1F","description":"1F","creator":"rp2@p.com","rating":[],"timeSubmitted":1474905724001,"similarTo":[],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzI0LjAwMQ==","title":"1FF","description":"1FF","creator":"rp2@p.com","rating":[],"timeSubmitted":1474905748039,"similarTo":[],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzE5LjE4Ng==","title":"1EE","description":"1EE","creator":"rp@p.com","rating":[],"timeSubmitted":1474905752712,"similarTo":["cnAxNDc0OTA1NzEyLjU1NA=="],"similarityHide":true}],"surveyId":8,"groupId":1474909224611}]
    //
    //   this.setState({
    //     data : initData[0].surveyData
    //   })
    //
    //
    // }


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
          data.map(function (entry, i) {
            var lineToDraw = _react2.default.createElement(
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

            return !entry.similarityHide ? lineToDraw : _react2.default.createElement(
              'div',
              { key: i },
              ' '
            );
          }),
          _react2.default.createElement(
            _RaisedButton2.default,
            {
              id: 'submitAnswers',
              style: { color: 'white' },
              type: 'submit',
              onClick: this.gatherData
            },
            'Submit'
          )
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
