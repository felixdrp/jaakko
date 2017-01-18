'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _surveyTypes = require('./components/survey/survey-types');

var sessionData = {
  sessionInfo: {
    nickName: 'Primera',
    date: '20/9/2016'
  },

  surveyPath: [

  // wait(),
  //
  // {
  //   type: QUESTION,
  //   payload: 'entry',
  //   time: 'inf',
  // },
  //
  // wait(),
  //
  // {
  //   type: INSTRUCTIONS,
  //   payload: 'experimentStructure',
  //   time: 'inf',
  // },
  //
  // wait(),
  //
  // ...task(),
  //
  // wait(),
  //
  // ...task2(),
  //
  // wait(),
  //
  // {
  //   type: INSTRUCTIONS,
  //   payload: 'math',
  //   time: 'inf',
  // },
  //
  // wait(),
  //
  // {
  //   type: MATH_CHALLENGE,
  //   payload: '',
  //   time: 'inf',
  // },
  //
  // wait(),
  //
  // {
  //   type: MATH_RESULTS,
  //   payload: '',
  //   time: 'inf',
  // },

  wait(), {
    type: _surveyTypes.QUESTION,
    payload: 'exit',
    time: 'inf'
  }, wait()]
};

function wait(time) {
  return {
    type: _surveyTypes.AWAIT,
    time: time || 'inf'
  };
}

function task(type) {
  return [{
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'alternativeObject',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.ALT_OBJECT_TASK,
    payload: 'altObjectTask',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'similarities',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.SIMILARITIES,
    payload: 'altObjectTask',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'favourites',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.FAVOURITES,
    payload: 'altObjectTask',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.RESULTS,
    payload: 'altObjectTask',
    time: 'inf'
  }];
}

function task2(type) {
  return [{
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'alternativeObjectFigural',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.ALT_OBJECT_TASK,
    payload: 'alternativeObjectFigural',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'similarities',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.SIMILARITIES,
    payload: 'altObjectTask',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'favourites',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.FAVOURITES,
    payload: 'altObjectTask',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.RESULTS,
    payload: 'altObjectTask',
    time: 'inf'
  }];
}

function testIntructions() {
  return [{
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'similarities',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'experimentStructure',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'alternativeObject',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'alternativeObjectFigural',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'favourites',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'math',
    time: 'inf'
  }];
}

exports.default = sessionData;
//# sourceMappingURL=session-data.js.map
