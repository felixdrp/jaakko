import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import qs from 'qs'
// import TopHeaderMenuContainer from './top-header-menu-container'
// import SearchCompact from './search-compact'

/**
 * Component that renders the common view. The top header and the bottom foot.
 *
 */

var CommonViewContainer = React.createClass({
  statics: {
    customMethod: function(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },

  beforeunload(ev) {
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


  render() {
    let props = this.props;
    let query = qs.parse(props.location.search);
    let location = {
      ...props.location,
      query
    }

    return (
      <div id="common-view-page">
        {
          // <TopHeaderMenuContainer />
        }
        <div
          className="container"
          style={{
            // paddingTop: 80,
            // paddingBottom: 30,
            // maxWidth: 700,
          }}
        >
          {props.children}
        </div>
      </div>
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
export default connect(mapStateToProps)(CommonViewContainer);
