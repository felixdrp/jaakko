/**
 * Module to export the components needed by react-router (please look ./src/routes.js)
 *
 */

// Account

export AccountSignIn from './account/signin'
export AccountSignUp from './account/signup'

// Admin Page

export ControlRoom from './admin/control-room'
export GroupManager from './admin/groups/group-manager';
export SessionManager from './admin/session/session-manager';

// Generic

export AppContainer from './app-container'
export CommonViewContainer from './common-view-container'

// Survey

export SurveyContainer from './survey/survey-container'
export Example from './survey/example'
export MathChallenge from './survey/math-challenge'
export AltObjectTask from './survey/alt-object-task'
export Question from './survey/question'
export Instructions from './survey/instructions'
export Wait from './survey/wait'
