'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _surveyTypes = require('./components/survey/survey-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sessionData = {
  sessionInfo: {
    nickName: 'Primera',
    date: '20/9/2016'
  },

  surveyPath: [wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'experimentStructure',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.QUESTION,
    payload: 'entry',
    time: 'inf'
  }].concat((0, _toConsumableArray3.default)(task()), [wait()], (0, _toConsumableArray3.default)(task2()), [wait(), {
    type: _surveyTypes.INSTRUCTIONS,
    payload: 'math',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.MATH_CHALLENGE,
    payload: '',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.MATH_RESULTS,
    payload: '',
    time: 'inf'
  }, wait(), {
    type: _surveyTypes.QUESTION,
    payload: 'exit',
    time: 'inf'
  }, wait()])
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

function testIntructions() {
  return [{
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
    payload: 'similarities',
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
