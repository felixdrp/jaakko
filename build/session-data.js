'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _surveyTypes = require('./components/survey/survey-types');

// import {
//   question1,
// } from './survey-data/survey-questions'

var sessionData = {
  sessionInfo: {
    nickName: 'Primera',
    date: '20/9/2016'
  },
  surveyPath: [{
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.QUESTION,
    payload: 4,
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }, {
    type: _surveyTypes.INSTRUCTIONS,
    time: 'inf'
  }, {
    type: _surveyTypes.AWAIT,
    time: 'inf'
  }]
};

exports.default = sessionData;
//# sourceMappingURL=session-data.js.map
