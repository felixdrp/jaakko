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

var _mathComputations = require('../../modules/mathComputations');

var _mathComputations2 = _interopRequireDefault(_mathComputations);

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentUserEmail = 'melacome3@gmail.com'; 

var MathResults = function (_Component) {
  (0, _inherits3.default)(MathResults, _Component);

  function MathResults(props) {
    (0, _classCallCheck3.default)(this, MathResults);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MathResults.__proto__ || (0, _getPrototypeOf2.default)(MathResults)).call(this, props));

    _this.getParticipantLine = function (participant, i) {
      var participantLine = _react2.default.createElement(
        'div',
        { key: i, style: { display: 'flex' } },
        _react2.default.createElement(
          _Card.Card,
          { style: { minWidth: 72, paddingTop: 10 } },
          _react2.default.createElement(
            _Card.CardText,
            { style: { fontSize: 'large', textAlign: 'center' } },
            participant.rank
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { style: { minWidth: 300, paddingTop: 10 } },
          _react2.default.createElement(
            _Card.CardText,
            { style: { fontSize: 16 } },
            participant.account.firstname + ' ' + participant.account.surname,
            ' '
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { style: { minWidth: 77, paddingTop: 10 } },
          _react2.default.createElement(
            _Card.CardText,
            { style: { fontSize: 'large', textAlign: 'center' } },
            participant.mathScore
          )
        ),
        _this.state.groupType > 1 ? _react2.default.createElement(
          _Card.Card,
          { style: { minWidth: 75, paddingTop: 10 } },
          _react2.default.createElement(
            _Card.CardText,
            { style: { fontSize: 'large', textAlign: 'center' } },
            '\xA3',
            participant.pay
          )
        ) : ''
      );

      if (_this.state.groupType == 0 || _this.state.groupType == 2) {
        if (_this.state.currentUserEmail == participant.account.email) {
          return participantLine;
        }
      } else {

        return participantLine;
      }
    };

    _this.gatherData = function () {
      if (!_this.isSubmitted) {
        _this.props.submit(_this.state);
        _this.isSubmitted = true;
      }
    };

    _this.isSubmitted = false;
    _this.state = {
      groupType: -1,
      currentUserEmail: "",
      accounts: [],
      data: []
    };
    return _this;
  }

  (0, _createClass3.default)(MathResults, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log("nextProps vienen pa ca");
      console.log(nextProps);
      this.setState({
        groupType: nextProps.groupType,
        currentUserEmail: nextProps.account.email,
        accounts: nextProps.accounts,
        data: (0, _mathComputations2.default)(nextProps.mathResults, nextProps.accounts) || []
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


      var title = 'Math Results Summary';
      var text = 'Here you can see you performance with respect to ther other participants within your group:';
      var data = this.state.data;

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
            { style: { paddingTop: 0 } },
            text,
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', textAlign: 'center' } },
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { fontSize: 'large' } },
                  'Rank'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                { style: { minWidth: 300 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { fontSize: 'large' } },
                  'Participant'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { fontSize: 'large' } },
                  'Score'
                )
              ),
              this.state.groupType > 1 ? _react2.default.createElement(
                _Card.Card,
                { style: { minWidth: 75 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { fontSize: 'large' } },
                  'Pay'
                )
              ) : ''
            ),
            data.map(function (participant, i) {

              return _this2.getParticipantLine(participant, i);
            }),
            _react2.default.createElement(
              _RaisedButton2.default,
              {
                id: 'submitAnswers',
                style: { color: 'rgb(124, 234, 127)', marginTop: 20, textAlign: 'center' },
                type: 'submit',
                onClick: this.gatherData
              },
              'Continue'
            )
          )
        )
      );
    }
  }]);
  return MathResults;
}(_react.Component);

MathResults.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


MathResults.propTypes = {}



;var mapStateToProps = function mapStateToProps(state) {
  return {
    account: state.account,
    accounts: state.task.payload.accounts,
    groupType: state.task.payload.groupType,
    mathResults: state.task.payload ? state.task.payload.mathResults : []
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MathResults);