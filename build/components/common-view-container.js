'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import TopHeaderMenuContainer from './top-header-menu-container'
// import SearchCompact from './search-compact'

/**
 * Component that renders the common view. The top header and the bottom foot.
 *
 */

var CommonViewContainer = _react2.default.createClass({
  displayName: 'CommonViewContainer',

  statics: {
    customMethod: function customMethod(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },

  beforeunload: function beforeunload(ev) {
    return ev.returnValue = 'My reason';
  },


  // Uncomment to prevent leave message
  // componentDidMount() {
  //   window.addEventListener('beforeunload', this.beforeunload)
  // },
  //
  // componentWillUnmount() {
  //   window.removeEventListener('beforeunload', this.beforeunload)
  // },


  render: function render() {
    var props = this.props;
    var query = _qs2.default.parse(props.location.search);
    var location = (0, _extends3.default)({}, props.location, {
      query: query
    });

    return _react2.default.createElement(
      'div',
      { id: 'common-view-page' },
      _react2.default.createElement(
        'div',
        {
          className: 'container',
          style: {
            // paddingTop: 80,
            // paddingBottom: 30,
            // maxWidth: 700,
          }
        },
        props.children
      )
    );
  }
});

function mapStateToProps(state, ownProps) {
  return {
    // if route contains params
    params: ownProps.params,
    location: ownProps.location
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(CommonViewContainer);
//# sourceMappingURL=common-view-container.js.map
