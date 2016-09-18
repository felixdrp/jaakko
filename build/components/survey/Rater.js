'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Star = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _star = require('./star');

Object.defineProperty(exports, 'Star', {
  enumerable: true,
  get: function get() {
    return _star.Star;
  }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rater = function (_Component) {
  (0, _inherits3.default)(Rater, _Component);

  function Rater(props) {
    (0, _classCallCheck3.default)(this, Rater);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Rater.__proto__ || (0, _getPrototypeOf2.default)(Rater)).call(this, props));

    _this.state = {
      lastRating: props.rating,
      rating: props.rating,
      isRating: false
    };
    return _this;
  }

  (0, _createClass3.default)(Rater, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        rating: nextProps.rating
      });
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter(e) {
      var _getRatingFromDOMEven = getRatingFromDOMEvent(e, this.props);

      var rating = _getRatingFromDOMEven.rating;
      var callback = this.props.onRate;
      if (rating > 0) {
        this.setState({
          rating: 0,
          isRating: true
        });
        callback && callback({
          originalEvent: e,
          rating: rating
        });
      }
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var _getRatingFromDOMEven2 = getRatingFromDOMEvent(e, this.props);

      var rating = _getRatingFromDOMEven2.rating;
      var callback = this.props.onRate;
      if (rating > 0) {
        this.setState({
          rating: rating,
          isRating: true
        });
        callback && callback({
          originalEvent: e,
          rating: rating
        });
      }
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(e) {
      var callback = this.props.onRate,
          state = this.state;
      this.setState({
        rating: state.lastRating,
        isRating: false
      });
      callback && callback({
        originalEvent: e,
        rating: state.lastRating
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var _getRatingFromDOMEven3 = getRatingFromDOMEvent(e, this.props);

      var index = _getRatingFromDOMEven3.index;
      var rating = _getRatingFromDOMEven3.rating;
      var lastRating = Number(this.state.lastRating);
      var callback = this.props.onRate;
      if (rating < 0 || this.refs['star-' + index].props.isDisabled) {
        return;
      }
      this.setState({
        rating: rating,
        lastRating: rating
      });
      callback && callback({
        originalEvent: e,
        rating: rating,
        lastRating: lastRating
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var total = _props.total;
      var limit = _props.limit;
      var rating = _props.rating;
      var interactive = _props.interactive;
      var children = _props.children;
      var rest = (0, _objectWithoutProperties3.default)(_props, ['total', 'limit', 'rating', 'interactive', 'children']);

      total = Number(total);
      limit = Number(limit);
      rating = Number(this.state.rating);
      children = Array.prototype.concat(children).filter(Boolean);
      limit = this.props.limit === void 0 ? total : limit;
      delete rest.onRate;
      var nodes = Array(total).join(',').split(',').map(function (_, i) {
        var starProps = {
          isActive: !_this2.state.isRating && i < rating ? true : false,
          willBeActive: _this2.state.isRating && i < rating ? true : false,
          isDisabled: i < limit ? false : true,
          key: 'star-' + i,
          ref: 'star-' + i
        };
        if (children.length) {
          return _react2.default.cloneElement(children[i % children.length], starProps);
        } else {
          return _react2.default.createElement(_star2.default, starProps);
        }
      });
      if (interactive) {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ className: 'react-rater',
            onMouseEnter: this.handleMouseEnter.bind(this),
            onMouseLeave: this.handleMouseLeave.bind(this),
            onMouseMove: this.handleMouseMove.bind(this),
            onClick: this.handleClick.bind(this)
          }, rest),
          nodes
        );
      } else {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ className: 'react-rater is-disabled' }, rest),
          nodes
        );
      }
    }
  }]);
  return Rater;
}(_react.Component);

exports.default = Rater;


Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true
};

Rater.propTypes = {
  total: _react.PropTypes.number,
  rating: _react.PropTypes.number,
  limit: _react.PropTypes.number,
  interactive: _react.PropTypes.bool,
  onRate: _react.PropTypes.func,
  children: _react.PropTypes.any
};

function getRatingFromDOMEvent(e, props) {
  var allStars = Array.apply(null, e.currentTarget.childNodes),
      star = findStarDOMNode(e.target, allStars, e.currentTarget),
      index = allStars.indexOf(star),
      rating = index + 1,
      limit = Number(props.limit);
  if (index < 0) {
    return {
      index: index,
      rating: -1
    };
  }
  limit = props.limit === void 0 ? props.total : limit;
  rating = rating < limit ? rating : limit;
  return {
    index: index,
    rating: Number(rating)
  };
}

function findStarDOMNode(node, stars, container) {
  while (node !== container && stars.indexOf(node) === -1) {
    node = node.parentNode;
  }
  return node;
}
//# sourceMappingURL=Rater.js.map
