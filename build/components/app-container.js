'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _muiLMSTheme = require('../muiLMSTheme');

var _muiLMSTheme2 = _interopRequireDefault(_muiLMSTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
var muiTheme = (0, _getMuiTheme2.default)(_muiLMSTheme2.default);

(0, _reactTapEventPlugin2.default)();
/**
 * Component that handles default App layout.
 *
 * React container pattern. The container component explained:
 * https://medium.com/@learnreact/container-components-c0e67432e005#.iu4v0nc2d
 *
 * Example usage (please look at ./src/routes.js):
 * ```
 * var routes = (history) => (
 *   <Router history={history}>
 *     <Route path="/" component={AppContainer}>
 *       <IndexRoute component={Dashboard} />
 * ```
 */

var AppContainer = _react2.default.createClass({
  displayName: 'AppContainer',
  beforeunload: function beforeunload(ev) {
    return ev.returnValue = 'My reason';
  },


  // Uncomment to prevent leave message
  componentDidMount: function componentDidMount() {
    // debugger
    window.addEventListener('beforeunload', this.beforeunload);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'maincontainer' },
      _react2.default.createElement(
        _MuiThemeProvider2.default,
        { muiTheme: muiTheme },
        this.props.children
      )
    );
  }
});

exports.default = AppContainer;
//# sourceMappingURL=app-container.js.map
