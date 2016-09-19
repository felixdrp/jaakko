'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveSurveyURL = resolveSurveyURL;
// Survey types

var AWAIT = exports.AWAIT = 'AWAIT';
var QUESTION = exports.QUESTION = 'QUESTION';
var INSTRUCTIONS = exports.INSTRUCTIONS = 'INSTRUCTIONS';
var EXAMPLE = exports.EXAMPLE = 'EXAMPLE';
var MATH_CHALLENGE = exports.MATH_CHALLENGE = 'MATH_CHALLENGE';
var ALT_OBJECT_TASK = exports.ALT_OBJECT_TASK = 'ALT_OBJECT_TASK';
var SIMILARITIES = exports.SIMILARITIES = 'SIMILARITIES';
var FAVOURITES = exports.FAVOURITES = 'FAVOURITES';
var MATH_RESULTS = exports.MATH_RESULTS = 'MATH_RESULTS';
var RESULTS = exports.RESULTS = 'RESULTS';

// If routes change please change also this part
function resolveSurveyURL(type) {
  var composeUrl = function composeUrl(parcialUrl) {
    return '/survey/' + parcialUrl;
  };

  switch (type) {
    case AWAIT:
      return composeUrl('waitSync');

    case INSTRUCTIONS:
      return composeUrl('instructions');

    case QUESTION:
      return composeUrl('question');

    case EXAMPLE:
      return composeUrl('example');

    case MATH_CHALLENGE:
      return composeUrl('mathChallenge');

    case ALT_OBJECT_TASK:
      return composeUrl('altObjectTask');

    case SIMILARITIES:
      return composeUrl('similarities');

    case FAVOURITES:
      return composeUrl('favourites');

    case MATH_RESULTS:
      return composeUrl('mathResults');

    case RESULTS:
      return composeUrl('results');
  }
}
//# sourceMappingURL=survey-types.js.map
