'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _surveyTypes = require('./components/survey/survey-types');

// import {
//   question1,
// } from './survey-data/survey-questions'


// export const AWAIT = 'AWAIT'
// export const QUESTION = 'QUESTION'
// export const INSTRUCTIONS = 'INSTRUCTIONS'
// export const EXAMPLE = 'EXAMPLE'
// export const MATH_CHALLENGE = 'MATH_CHALLENGE'
// export const ALT_OBJECT_TASK = 'ALT_OBJECT_TASK'
// export const SIMILARITIES = 'SIMILARITIES'
// export const FAVOURITES = 'FAVOURITES'
// export const MATH_RESULTS = 'MATH_RESULTS'
// export const RESULTS = 'RESULTS'

var sessionData = {
  sessionInfo: {
    nickName: 'Primera',
    date: '20/9/2016'
  },
  surveyPath: [{
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.MATH_CHALLENGE,
    payload: '',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.MATH_RESULTS,
    payload: '',
    time: 'inf'
  }, {
    type: _surveyTypes.ALT_OBJECT_TASK,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.SIMILARITIES,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.FAVOURITES,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.RESULTS,
    payload: 'altObjectTask',
    time: 'inf'
  },
  // {
  //   type: AWAIT,
  //   time: 'inf',
  // },
  // {
  //   type: QUESTION,
  //   payload: 'entry',
  //   time: 'inf',
  // },

  //first round
  {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.ALT_OBJECT_TASK,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.SIMILARITIES,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.FAVOURITES,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.RESULTS,
    payload: 'altObjectTask',
    time: 'inf'
  },

  //Second round
  {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.ALT_OBJECT_TASK,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.SIMILARITIES,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.FAVOURITES,
    payload: 'altObjectTask',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.RESULTS,
    payload: 'altObjectTask',
    time: 'inf'
  },

  //End
  {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'math',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.MATH_CHALLENGE,
    payload: '',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.MATH_RESULTS,
    payload: '',
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.QUESTION,
    payload: 'exit',
    time: 'inf'
  }]
};

exports.default = sessionData;
//# sourceMappingURL=session-data.js.map
