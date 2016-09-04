'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _memory = require('material-ui/svg-icons/hardware/memory');

var _memory2 = _interopRequireDefault(_memory);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _groups = require('./groups');

var _websocketSimple = require('../../websocket-message/websocket-simple');

var _websocketSimple2 = _interopRequireDefault(_websocketSimple);

var _queryActions = require('../../websocket-message/query-actions');

var _actions = require('../../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Perf from 'react-addons-perf'
// window.Perf = Perf

// import GroupManager from './groups/group-manager';

var ControlRoom = function (_React$Component) {
  (0, _inherits3.default)(ControlRoom, _React$Component);

  // static childContextTypes = {
  //   wsSession: React.PropTypes.object
  // }
  //
  // async getChildContext() {
  //   return { wsSession: this.state.wsSession };
  // }

  function ControlRoom() {
    (0, _classCallCheck3.default)(this, ControlRoom);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ControlRoom.__proto__ || (0, _getPrototypeOf2.default)(ControlRoom)).call(this));

    _this.state = {
      // WebSocket Session, used to create an admin connection.
      wsSession: {},
      // storeSession. Estore the server session store.
      storeSession: {}
    };
    return _this;
  }

  (0, _createClass3.default)(ControlRoom, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      console.log('testing storeStateWithoutWebSocket' + (0, _actions.storeStateWithoutWebSocket)({ mlk: 'supermlk' }));
      // Connection example: "wss://localhost:8008"
      var ws = new WebSocket('wss://' + location.hostname + ':' + (parseInt(location.port) + 1));

      ws.onmessage = function (event) {
        // Check the query.
        // Process action.
        var message = void 0;
        console.log('>>>' + event.data);
        if (/^\{.*\}$/.test(event.data)) {
          message = JSON.parse(event.data);
        } else {
          console.log(event.data);
          return;
        }
        console.log('>>>' + (0, _stringify2.default)(event.data));

        switch (message.type) {
          // Process message of type MUTATE
          case 'MUTATE':
            // mutate({
            //   action: message.action,
            //   payload: message.payload,
            //   websocket,
            //   store
            // })
            break;
          // Process message of type QUERY
          case 'QUERY':
            // console.log(message.type + ' ' + message.payload.email || '')
            break;
          // Process message of type ACTIONS
          default:
            switch (message.action) {
              case _queryActions.SESSION_STATE_GET:
                _this2.setState({ storeSession: message.payload });
                break;
              default:

            }
            // dispatch 'ACTIONS'
            console.log(message.type + ' ' + message.payload || '');
          // store.dispatch( { type: message.action, payload: message.payload } )
        }
      };
      ws.onopen = function (e) {
        // var websocket used to send data.
        var websocket = new _websocketSimple2.default(ws);
        // Ask for the server state
        websocket.send((0, _queryActions.wsSessionStateGet)());
        _this2.setState({ wsSession: websocket });
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.state.wsSession.ws.close();
                this.setState({ wsSession: {} });
                // debugger

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillUnmount() {
        return _ref.apply(this, arguments);
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AppBar2.default, {
          title: 'Study Admin',
          iconElementLeft: _react2.default.createElement(
            _IconButton2.default,
            null,
            _react2.default.createElement(_memory2.default, null)
          ),
          iconElementRight: _react2.default.createElement(
            _IconMenu2.default,
            {
              iconButtonElement: _react2.default.createElement(
                _IconButton2.default,
                null,
                _react2.default.createElement(_moreVert2.default, null)
              ),
              targetOrigin: { horizontal: 'right', vertical: 'top' },
              anchorOrigin: { horizontal: 'right', vertical: 'top' }
            },
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Refresh' }),
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Help' }),
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Sign out' })
          )
        }),
        _react2.default.createElement(_groups.GroupManager, {
          wsSession: this.state.wsSession,
          accounts: this.state.storeSession.accounts,
          groups: this.state.storeSession.groups
        })
      );
    }
  }]);
  return ControlRoom;
}(_react2.default.Component);

exports.default = ControlRoom;
//# sourceMappingURL=control-room.js.map
