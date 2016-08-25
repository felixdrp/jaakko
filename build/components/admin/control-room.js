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

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Chip = require('material-ui/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _group = require('material-ui/svg-icons/social/group');

var _group2 = _interopRequireDefault(_group);

var _groupAdd = require('material-ui/svg-icons/social/group-add');

var _groupAdd2 = _interopRequireDefault(_groupAdd);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _developerBoard = require('material-ui/svg-icons/hardware/developer-board');

var _developerBoard2 = _interopRequireDefault(_developerBoard);

var _memory = require('material-ui/svg-icons/hardware/memory');

var _memory2 = _interopRequireDefault(_memory);

var _modeEdit = require('material-ui/svg-icons/editor/mode-edit');

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Icons

var ControlRoom = function (_React$Component) {
  (0, _inherits3.default)(ControlRoom, _React$Component);

  function ControlRoom() {
    (0, _classCallCheck3.default)(this, ControlRoom);
    return (0, _possibleConstructorReturn3.default)(this, (ControlRoom.__proto__ || (0, _getPrototypeOf2.default)(ControlRoom)).apply(this, arguments));
  }

  (0, _createClass3.default)(ControlRoom, [{
    key: 'render',
    value: function render() {
      var style = {
        gray: {
          color: '#565555'
        }
      };
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
        _react2.default.createElement(
          _Card.Card,
          {
            style: {
              paddingBottom: 20
            }
          },
          _react2.default.createElement(_Card.CardHeader, {
            title: _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                _IconButton2.default,
                null,
                _react2.default.createElement(_group2.default, null)
              ),
              ' Groups manager '
            ),
            subtitle: 'Groups manager'
            // avatar="images/jsa-128.jpg"
          }),
          _react2.default.createElement(_Card.CardTitle, {
            title: _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_group2.default, { style: style.gray }),
              _react2.default.createElement(_developerBoard2.default, { style: (0, _extends3.default)({}, style.gray, { marginRight: 10 }) }),
              'Groups automated'
            ),
            subtitle: 'Groups creation with AI help'
          }),
          _react2.default.createElement(
            _Card.CardText,
            null,
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.'
          ),
          _react2.default.createElement(_Card.CardTitle, {
            title: _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_group2.default, { style: style.gray }),
              _react2.default.createElement(_modeEdit2.default, { style: (0, _extends3.default)({}, style.gray, { marginRight: 10 }) }),
              'Groups customization'
            ),
            subtitle: 'Groups manual fine customization'
          }),
          _react2.default.createElement(_RaisedButton2.default
          // Unassigned Accounts
          , { label: _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_personOutline2.default, { style: {
                  color: '#6c6c6c',
                  position: 'relative',
                  top: 6,
                  marginRight: 7
                } }),
              '10',
              _react2.default.createElement(
                'span',
                {
                  style: {
                    color: '#6c6c6c',
                    marginLeft: 15
                  }
                },
                'Unassigned Accounts'
              )
            ),
            onClick: function onClick() {
              return console.log('onclik!!!!');
            },
            backgroundColor: '#efefef',
            style: {
              minWidth: '95%',
              margin: '2.5%'
            }
          }),
          _react2.default.createElement(
            'div',
            {
              // Unassigned Chips
              style: {
                minWidth: '95%',
                margin: '2.5%',
                marginTop: 0
              }
            },
            _react2.default.createElement(
              _Chip2.default,
              {
                backgroundColor: '#d6d6d6'
                // onRequestDelete={ () => console.log('onclik!!!!') }
                , onTouchTap: function onTouchTap() {
                  return console.log('onclik!!!!');
                },
                style: {
                  margin: 3
                }
              },
              'Colored Chip'
            )
          ),
          _react2.default.createElement(
            'div',
            {
              // Assign Groups
              // Groups Chips
              style: {
                minWidth: '95%',
                margin: '2.5%',
                marginTop: 65
              }
            },
            _react2.default.createElement(_RaisedButton2.default, {
              label: _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_groupAdd2.default, { style: {
                    position: 'relative',
                    top: 6,
                    marginRight: 7
                  } }),
                'Add group'
              ),
              onClick: function onClick() {
                return console.log('onclik!!!!');
              },
              backgroundColor: '#ddffb1',
              style: {
                // minWidth: '95%',
                marginBottom: 20
              }
            }),
            _react2.default.createElement(
              _Card.Card,
              {
                style: {
                  width: 460,
                  paddingBottom: 15
                }
              },
              _react2.default.createElement(_RaisedButton2.default, {
                label: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_group2.default, {
                    style: {
                      color: '#6c6c6c',
                      position: 'relative',
                      top: 6,
                      marginRight: 7
                    }
                  }),
                  'Group 1',
                  _react2.default.createElement(_personOutline2.default, {
                    style: {
                      color: '#6c6c6c',
                      position: 'relative',
                      top: 6,
                      marginLeft: 7,
                      marginRight: 7
                    }
                  }),
                  '10',
                  _react2.default.createElement(
                    'span',
                    {
                      style: {
                        color: '#6c6c6c',
                        marginLeft: 15
                      }
                    },
                    'Assigned Accounts'
                  )
                ),
                onClick: function onClick() {
                  return console.log('onclik!!!!');
                },
                backgroundColor: '#f59999',
                style: {
                  minWidth: '95%',
                  margin: '2.5%'
                }
              }),
              _react2.default.createElement(
                'div',
                {
                  // Group 1 Chips
                  style: {
                    minWidth: '95%',
                    margin: '2.5%'
                  }
                },
                _react2.default.createElement(
                  _Chip2.default,
                  {
                    backgroundColor: '#efefef',
                    onRequestDelete: function onRequestDelete() {
                      return console.log('onclik!!!!');
                    },
                    onTouchTap: function onTouchTap() {
                      return console.log('onclik!!!!');
                    },
                    style: {
                      margin: 4
                    }
                  },
                  'Colored Chip'
                )
              )
            )
          )
        )
      );
    }
  }]);
  return ControlRoom;
}(_react2.default.Component);

// groups

exports.default = ControlRoom;
//# sourceMappingURL=control-room.js.map
