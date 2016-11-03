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

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var Results = function (_Component) {
  (0, _inherits3.default)(Results, _Component);

  function Results(props) {
    (0, _classCallCheck3.default)(this, Results);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Results.__proto__ || (0, _getPrototypeOf2.default)(Results)).call(this, props));

    _this.processIncomingData = function (data, accounts) {

      if (data == null) {
        return;
      }

      var results = data.reduce(function (prev, current) {
        var account = accounts[current.creator];
        var currentEntry = { account: { email: current.creator, firstname: account.firstName, surname: account.surname }, stars: [0, 0, 0, 0, 0], lastTimeSubmitted: current.timeSubmitted };
        var index = (current.rating[0] || 0) - 1;
        if (index > -1) currentEntry.stars[index] = 1;
        var isThereIndex = prev.findIndex(function (element, index, array) {
          return element.account.email == currentEntry.account.email;
        });
        if (isThereIndex > -1) {

          for (var i in currentEntry.stars) {
            prev[isThereIndex].stars[i] = prev[isThereIndex].stars[i] + currentEntry.stars[i];
          }

          if (prev[isThereIndex].lastTimeSubmitted < currentEntry.lastTimeSubmitted) {
            prev[isThereIndex].lastTimeSubmitted = currentEntry.lastTimeSubmitted;
          }
        } else {
          prev.push(currentEntry);
        }
        return prev;
      }, []);

      var data = results;
      _this.computeRanking(data);

      data.sort(function (a, b) {
        if (b.score - a.score == 0) {
          if (b.stars[4] - a.stars[4] == 0) {
            if (b.stars[3] - a.stars[3] == 0) {
              if (b.stars[2] - a.stars[2] == 0) {
                if (b.stars[1] - a.stars[1] == 0) {
                  if (b.stars[0] - a.stars[0] == 0) {
                    return a.lastTimeSubmitted - b.lastTimeSubmitted;
                  } else {
                    return b.stars[0] - a.stars[0];
                  }
                } else {
                  return b.stars[1] - a.stars[1];
                }
              } else {
                return b.stars[2] - a.stars[2];
              }
            } else {
              return b.stars[3] - a.stars[3];
            }
          } else {
            return b.stars[4] - a.stars[4];
          }
        } else {
          return b.score - a.score;
        }
      });

      data.map(function (item, i) {
        item.rank = i + 1;item.pay = _this.getPay(i + 1) + 1;
      });

      return data;
    };

    _this.getPay = function (i) {
      switch (i) {
        case 1:
          return 5;
        case 2:
          return 2;
        case 3:
          return 1;
        case 4:
          return 0.5;
        case 5:
          return 0;
        default:
          return 0;
      }
    };

    _this.computeRanking = function (data) {
      data.map(function (participant) {
        participant.score = _this.computeStarScore(participant.stars);
      });
    };

    _this.computeStarScore = function (stars) {
      var totalScore = 0;
      for (var i = 0; i < stars.length; i++) {
        totalScore += (i + 1) * stars[i];
      }
      return totalScore;
    };

    _this.getStarIcon = function (i) {
      switch (i) {
        case 1:
          return _react2.default.createElement(
            'div',
            { style: { width: 22, height: 36 } },
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', top: 8, left: 5 } })
          );
        case 2:
          return _react2.default.createElement(
            'div',
            { style: { width: 22, height: 36 } },
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', top: 3, left: 5 } }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', left: 5, bottom: 3 } })
          );
        case 3:
          return _react2.default.createElement(
            'div',
            { style: { width: 22, height: 36 } },
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', top: 3 } }),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', top: 3 } }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', left: 5, bottom: 3 } })
          );
        case 4:
          return _react2.default.createElement(
            'div',
            { style: { width: 22, height: 36 } },
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', top: 3 } }),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', top: 3 } }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', bottom: 3 } }),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', bottom: 3 } })
          );
        case 5:
          return _react2.default.createElement(
            'div',
            { style: { width: 22, height: 36 } },
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10 } }),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10 } }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10 } }),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10 } }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_svgIcons.ToggleStar, { style: { width: 10, height: 10, position: 'relative', top: -24, left: 5 } })
          );
        default:
          return _react2.default.createElement('div', { style: { width: 22, height: 36 } });
      }
    };

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
          { style: { paddingTop: 10 } },
          _react2.default.createElement(
            _Card.CardText,
            null,
            _react2.default.createElement(
              'div',
              { style: { display: 'flex' } },
              participant.stars.map(function (number, starType) {
                return _react2.default.createElement(
                  'div',
                  { key: starType, style: { display: 'flex' } },
                  _this.getStarIcon(starType + 1),
                  _react2.default.createElement(
                    'div',
                    { style: { padding: 5, paddingLeft: 0, fontSize: 'large', marginLeft: 3, marginRight: 4 } },
                    number
                  )
                );
              }).reverse()
            )
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { style: { minWidth: 77, paddingTop: 10 } },
          _react2.default.createElement(
            _Card.CardText,
            { style: { fontSize: 'large', textAlign: 'center' } },
            participant.score
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
    _this.state = { data: null, groupType: -1, currentUserEmail: '', accounts: {} };
    return _this;
  }

  (0, _createClass3.default)(Results, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log("nextProps vienen pa ca");
      console.log(nextProps);
      this.setState({
        groupType: nextProps.groupType,
        currentUserEmail: nextProps.account.email,
        accounts: nextProps.accounts,
        data: this.processIncomingData(nextProps.ideas, nextProps.accounts) || []
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


      var title = 'Results Summary';
      var text = 'Here you can see you performance with respect to ther other participants within your group:';
      var data = this.state.data;

      if (data == null) {
        return _react2.default.createElement('div', null);
      }

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
                { style: { minWidth: 252 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { fontSize: 'large' } },
                  'Stars'
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
  return Results;
}(_react.Component);

Results.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


Results.propTypes = {}



;var mapStateToProps = function mapStateToProps(state) {
  return {
    account: state.account,
    accounts: state.task.payload.accounts,
    groupType: state.task.payload.groupType,
    ideas: state.task.payload ? state.task.payload.ideas : []
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Results);