import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'

/**
 * React-router components.
 *
 * React router help to render component related to the path or url.
 *
 * Please have a look to:
 * https://github.com/reactjs/react-router
 *
 */

// Please add new core components to /components/index.js

import {
  AccountSignIn,
  AccountSignUp,
  AppContainer,
  ControlRoom,
  CommonViewContainer,
  Example,
  MathChallenge,
  AltObjectTask,
  Question,
  Instructions,
  Wait,
} from './components/'

// Assign the history:
var routes = (history) => (
  <Router history={history}>
    <Route path="/" component={AppContainer} >
      <IndexRoute component={CommonViewContainer} />
      <IndexRedirect to="/account/signin" />

      <Route path="account" component={CommonViewContainer} >
        <IndexRoute component={AccountSignIn} />
        <Route path="signin" component={AccountSignIn} />
        <Route path="signup" component={AccountSignUp} />
      </Route>

      <Route path="controlRoom" component={CommonViewContainer} >
        <IndexRoute component={ControlRoom} />
      </Route>

      <Route path="survey" component={CommonViewContainer} >
        <Route path="waitSync" component={Wait} />
        <Route path="example" component={Example} />
        <Route path="question" component={Question} />
        <Route path="mathChallenge" component={MathChallenge} />
        <Route path="altObjectTask" component={AltObjectTask} />
        <Route path="instructions" component={Instructions} />

      </Route>

      {/*
      <Route path="/login" component={CommonViewContainer} >
        <IndexRoute component={Login} />
      </Route>
      <Route path="/signup" component={CommonViewContainer} >
        <IndexRoute component={Signup} />
      </Route>
      */}
    </Route>
  </Router>
)

export default routes
