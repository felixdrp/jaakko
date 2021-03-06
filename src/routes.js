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
  // Core components
  AppContainer,
  CommonViewContainer,

  // Account Login and register
  AccountSignIn,
  AccountSignUp,


  // Control session
  ControlRoom,
  GroupManager,
  SessionManager,
  ResultsManager,

  // Survey
  SurveyContainer,
  Example,
  MathChallenge,
  MathResults,
  AltObjectTask,
  Question,
  Instructions,
  Similarities,
  Favourites,
  Results,
  Wait,
} from './components/'

// Assign the history:

// ALERT!!!! if any change in survye routes... change also 'survey-types.js'
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

      <Route path="controlRoom" component={ControlRoom} >
        <IndexRoute component={GroupManager} />
        <Route path="groups" component={GroupManager} />
        <Route path="sessionControl" component={SessionManager} />
        <Route path="results" component={ResultsManager} />
      </Route>

      <Route path="survey" component={SurveyContainer} >
        <Route path="waitSync" component={Wait} />
        <Route path="example" component={Example} />
        <Route path="question" component={Question} />
        <Route path="mathChallenge" component={MathChallenge} />
        <Route path="altObjectTask" component={AltObjectTask} />
        <Route path="instructions" component={Instructions} />
        <Route path="similarities" component={Similarities} />
        <Route path="favourites" component={Favourites} />
        <Route path="results" component={Results} />
        <Route path="mathResults" component={MathResults} />

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
