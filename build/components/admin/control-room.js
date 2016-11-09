'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _memory = require('material-ui/svg-icons/hardware/memory');

var _memory2 = _interopRequireDefault(_memory);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _group = require('material-ui/svg-icons/social/group');

var _group2 = _interopRequireDefault(_group);

var _class = require('material-ui/svg-icons/action/class');

var _class2 = _interopRequireDefault(_class);

var _showChart = require('material-ui/svg-icons/editor/show-chart');

var _showChart2 = _interopRequireDefault(_showChart);

var _reactRouter = require('react-router');

var _websocketSimple = require('../../websocket-message/websocket-simple');

var _websocketSimple2 = _interopRequireDefault(_websocketSimple);

var _queryActions = require('../../websocket-message/query-actions');

var _actions = require('../../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var ControlRoom = function (_React$Component) {
  (0, _inherits3.default)(ControlRoom, _React$Component);


  function ControlRoom() {
    (0, _classCallCheck3.default)(this, ControlRoom);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ControlRoom.__proto__ || (0, _getPrototypeOf2.default)(ControlRoom)).call(this));

    _this.handleToggle = function () {
      return _this.setState({ openSideMenu: !_this.state.openSideMenu });
    };

    _this.handleClose = function () {
      return _this.setState({ openSideMenu: false });
    };

    _this.state = {
      wsSession: {},
      storeSession: {},
      openSideMenu: false
    };
    return _this;
  }

  (0, _createClass3.default)(ControlRoom, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var ws = new WebSocket('wss://' + location.hostname + ':' + (parseInt(location.port) + 1));

      ws.onmessage = function (event) {
        var message = void 0;
        if (/^\{.*\}$/.test(event.data)) {
          message = JSON.parse(event.data);
        } else {
          return;
        }

        switch (message.type) {
          case 'MUTATE':
            break;
          case 'QUERY':
            break;
          default:
            switch (message.action) {
              case _queryActions.SESSION_STATE_GET:
                _this2.setState({ storeSession: message.payload });
                break;
              default:

            }
        }
      };
      ws.onopen = function (e) {
        var websocket = new _websocketSimple2.default(ws);
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
      var _this3 = this;

      var style = {
        gray: {
          color: '#565555'
        },
        iconGray: {
          fill: '#565555',
          position: 'relative',
          top: 6,
          marginRight: 7
        }
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AppBar2.default, {
          title: 'Study Admin',
          iconElementLeft: _react2.default.createElement(
            _IconButton2.default,
            { onTouchTap: this.handleToggle },
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
        _react2.default.createElement(
          _Drawer2.default,
          {
            docked: false,
            width: 200,
            open: this.state.openSideMenu,
            onRequestChange: function onRequestChange(open) {
              return _this3.setState({ openSideMenu: open });
            }
          },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/controlRoom/groups', style: { textDecoration: 'none' } },
            _react2.default.createElement(
              _MenuItem2.default,
              { onTouchTap: this.handleClose },
              _react2.default.createElement(
                'span',
                { style: style.gray },
                _react2.default.createElement(_group2.default, { style: style.iconGray }),
                'Groups manager'
              )
            )
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/controlRoom/sessionControl', style: { textDecoration: 'none' } },
            _react2.default.createElement(
              _MenuItem2.default,
              { onTouchTap: this.handleClose },
              _react2.default.createElement(
                'span',
                { style: style.gray },
                _react2.default.createElement(_class2.default, { style: style.iconGray }),
                'Session manager'
              )
            )
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/controlRoom/results', style: { textDecoration: 'none' } },
            _react2.default.createElement(
              _MenuItem2.default,
              { onTouchTap: this.handleClose },
              _react2.default.createElement(
                'span',
                { style: style.gray },
                _react2.default.createElement(_showChart2.default, { style: style.iconGray }),
                'Result manager'
              )
            )
          )
        ),
        this.props.children && _react2.default.cloneElement(this.props.children, {
          wsSession: this.state.wsSession,
          accounts: this.state.storeSession.accounts,
          groups: this.state.storeSession.groups,
          storeSession: this.state.storeSession
        })
      );
    }
  }]);
  return ControlRoom;
}(_react2.default.Component);

exports.default = ControlRoom;