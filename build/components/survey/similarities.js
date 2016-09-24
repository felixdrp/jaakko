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

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Similarities = function (_Component) {
  (0, _inherits3.default)(Similarities, _Component);

  function Similarities(props) {
    (0, _classCallCheck3.default)(this, Similarities);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Similarities.__proto__ || (0, _getPrototypeOf2.default)(Similarities)).call(this, props));

    _this.handleChange = function (event, selectionIndex, field, originIndex) {

      var data = _this.state.data;

      if (field > -1 && selectionIndex == data.length) {
        // this is the remove case.

        data = _this.removeSimilars(data, originIndex, field);
        data = _this.removeSimilars(data, field, originIndex);
        _this.setState({ data: data });
        return;
      }

      if (field > -1) {
        data = _this.modifySimilars(data, originIndex, selectionIndex, field);
        data = _this.modifySimilars(data, field, originIndex, originIndex);
      }

      if (data[originIndex].similarTo.indexOf(selectionIndex) < 0) {
        data[originIndex].similarTo.push(selectionIndex);
      }

      if (data[selectionIndex].similarTo.indexOf(originIndex) < 0) {
        data[selectionIndex].similarTo.push(originIndex);
      }

      _this.setState({ data: data });
    };

    _this.modifySimilars = function (data, dataIndex, similarsIndex, modifyIndex) {

      var clean_array = [];
      for (var a in data[dataIndex].similarTo) {
        if (data[dataIndex].similarTo[a] == modifyIndex) {
          if (data[dataIndex].similarTo.indexOf(similarsIndex) < 0) {
            clean_array.push(similarsIndex);
          }
          continue;
        }
        clean_array.push(data[dataIndex].similarTo[a]);
      }
      data[dataIndex].similarTo = clean_array;

      return data;
    };

    _this.removeSimilars = function (data, dataIndex, similarsIndex) {

      var clean_array = [];
      for (var a in data[dataIndex].similarTo) {
        if (data[dataIndex].similarTo[a] == similarsIndex) {
          if (data[dataIndex].similarTo.indexOf(similarsIndex) > -1) {
            continue;
          }
        }
        clean_array.push(data[dataIndex].similarTo[a]);
      }
      data[dataIndex].similarTo = clean_array;

      return data;
    };

    _this.gatherData = function () {
      var data = _this.state.data.slice();
      for (var d in data) {
        var entry = data[d];

        for (var s in entry.similarTo) {
          var entry_index = entry.similarTo[s];

          entry.similarTo[s] = data[entry_index].id;
        }
      }

      //  this.setState({data})
      console.log((0, _stringify2.default)(_this.state));
      return data;
    };

    _this.state = { data: _this.props.ideas };

    return _this;
  }

  (0, _createClass3.default)(Similarities, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        data: nextProps.ideas || []
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // this.setState({data : [ { group: 1474585598573,
      //    groupType: 0,
      //    id: 'cnAxNDc0NTg1NjAyLjExMw==',
      //    title: 'gfdgdfs',
      //    description: 'gfdgfds',
      //    creator: 'rpsoft@gmail.com',
      //    rating: [],
      //    timeSubmitted: 1474585604805,
      //    similarTo: [] },
      // //  { group: 1474585598573,
      // //    groupType: 0,
      // //    id: 'cnAxNDc0NTg1NjA0LjgwNQ==',
      // //    title: '432432',
      // //    description: 'gfdsgfds',
      // //    creator: 'rpsoft@gmail.com',
      // //    rating: [],
      // //    timeSubmitted: 1474585607161,
      // //    similarTo: [] },
      // //  { group: 1474585598573,
      // //    groupType: 0,
      // //    id: 'cnAxNDc0NTg1NjA3LjE2MQ==',
      // //    title: '543gfdgfds63',
      // //    description: 'hgdfsdf4',
      // //    creator: 'rpsoft@gmail.com',
      // //    rating: [],
      // //    timeSubmitted: 1474585610161,
      // //    similarTo: [] },
      // //  { group: 1474585598573,
      // //    groupType: 0,
      // //    id: 'cnAxNDc0NTg1NjEwLjE2MQ==',
      // //    title: 'erhrhgf',
      // //    description: 'hgfhgffhdg',
      // //    creator: 'rpsoft@gmail.com',
      // //    rating: [],
      // //    timeSubmitted: 1474585612141,
      // //    similarTo: [] },
      // //  { group: 1474585598573,
      // //    groupType: 0,
      // //    id: 'cnAxNDc0NTg1NjEyLjE0MQ==',
      // //    title: '654546',
      // //    description: 'hghgfhgfds',
      // //    creator: 'rpsoft@gmail.com',
      // //    rating: [],
      // //    timeSubmitted: 1474585614096,
      // //    similarTo: [] },
      //  { group: 1474585598573,
      //    groupType: 0,
      //    id: 'cnAxNDc0NTg1NjE0LjA5Ng==',
      //    title: 'hgfghf',
      //    description: 'gf  // this.setState({data : [ { group: 1474585598573,
      //    groupType: 0,
      //    id: 'cnAxNDc0NTg1NjAyLjExMw==',
      //    title: 'gfdgdfs',
      //    description: 'gfdgfds',
      //    creator: 'rpsoft@gmail.com',
      //    rating: [],
      //    timeSubmitted: 1474585604805,
      //    similarTo: [] },
      // //  { group: 1474585598573,
      // //    groupType: 0,
      // //    id: 'cnAxNDc0NTg1NjA0LjgwNQ==',
      // //    title: '432432',
      // //    description: 'gfdsgfds',
      // //    creator: 'rpsoft@gmail.com',
      // //    rating: [],
      // //    timeSubmitted: 1474585607161,
      // //    similarTo: [] },
      // //  { group: 1474585598573,
      // //    groupType: 0,
      // //    id: 'cnAxNDc0NTg1NjA3LjE2MQ==',
      // //    title: '543gfdgfds63',
      // //    description: 'hgdfsdf4',
      // //    creator: 'rpsoft@gmail.com',
      // //    rating: [],
      // //    timeSubmitted: 1474585610161,
      // //    similarTo: [] },
      // //  { group: 1474585598573,
      // //    groupType: 0,
      // //    id: 'cnAxNDc0NTg1NjEwLjE2MQ==',
      // //    title: 'erhrhgf',
      // //    description: 'hgfhgffhdg',
      // //    creator: 'rpsoft@gmail.com',
      // //    rating: [],
      // //    timeSubmitted: 1474585612141,
      // //    similarTo: [] },
      // //  { group: 1474585598573,
      // //    groupType: 0,
      // //    id: 'cnAxNDc0NTg1NjEyLjE0MQ==',
      // //    title: '654546',
      // //    description: 'hghgfhgfds',
      // //    creator: 'rpsoft@gmail.com',
      // //    rating: [],
      // //    timeSubmitted: 1474585614096,
      // //    similarTo: [] },
      //  { group: 1474585598573,
      //    groupType: 0,
      //    id: 'cnAxNDc0NTg1NjE0LjA5Ng==',
      //    title: 'hgfghf',
      //    description: 'gfdfgds',
      //    creator: 'rpsoft@gmail.com',
      //    rating: [],
      //    timeSubmitted: 1474585616712,
      //    similarTo: [] } ]});dfgds',
      //    creator: 'rpsoft@gmail.com',
      //    rating: [],
      //    timeSubmitted: 1474585616712,
      //    similarTo: [] } ]});
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


    //'_marker'
    value: function render() {
      var _this2 = this;

      var textColor = this.context.muiTheme.palette.textColor;


      var title = 'Similarities Task';
      var text = 'The task is to come up with as many alternative objects for a given object. \n\n For example:';

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
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_timer2.default, { limitTime: 5, timerCallback: function timerCallback() {
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
                  null,
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
                    { style: { padding: 8, paddingTop: 28, fontWeight: 800 } },
                    'Similar to:'
                  )
                ),
                entry.similarTo.map(function (sim_entry, j) {

                  return _react2.default.createElement(
                    _Card.Card,
                    { key: j },
                    _react2.default.createElement(
                      _Card.CardText,
                      { style: { padding: 8 } },
                      _react2.default.createElement(
                        _SelectField2.default,
                        { value: sim_entry, onChange: function onChange(event, index, value) {
                            return _this2.handleChange(event, index, sim_entry, i);
                          }, style: { width: 30, maxHeight: 85 } },
                        data.map(function (entry_options, z) {
                          return _react2.default.createElement(_MenuItem2.default, { key: z, value: z, primaryText: z + '', disabled: entry.title == entry_options.title });
                        })
                        // data.map( (entry_options,z) => {return (entry.title == entry_options.title ) ? <MenuItem key={z} value={z} primaryText={z} /> : <MenuItem key={z} /> })
                        ,
                        _react2.default.createElement(_MenuItem2.default, { value: data.length, primaryText: 'remove' })
                      )
                    )
                  );
                }),
                _react2.default.createElement(
                  _Card.Card,
                  null,
                  _react2.default.createElement(
                    _Card.CardText,
                    { style: { padding: 8 } },
                    _react2.default.createElement(
                      _SelectField2.default,
                      { value: -1, onChange: function onChange(event, index, value) {
                          return _this2.handleChange(event, index, -1, i);
                        }, style: { width: 30 } },
                      data.map(function (entry_options, z) {
                        return _react2.default.createElement(_MenuItem2.default, { key: z, value: z, primaryText: z + '', disabled: entry.title == entry_options.title });
                      })
                    )
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);
  return Similarities;
}(_react.Component);

Similarities.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


Similarities.propTypes = {}
// addTodo: PropTypes.func.isRequired


//export default Question

;var mapStateToProps = function mapStateToProps(state) {
  return {
    firstName: state.account.firstName,
    ideas: state.task.payload ? state.task.payload.ideas : []
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Similarities);
//# sourceMappingURL=similarities.js.map
