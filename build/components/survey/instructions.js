'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Slider = require('material-ui/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RadioButton = require('material-ui/RadioButton');

var _rater = require('./rater');

var _rater2 = _interopRequireDefault(_rater);

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instructionsData = {
  experimentStructure: {
    0: {
      title: 'Experiment Structure',
      text: 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it.' + '\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – In the order shown below. The final task will be completed individually.' + '\n[b]1.Task Completion Stage:[/b] You are asked to generate ideas based on the instructions provided.' + '\n[b]2.Similarities Stage:[/b] At this stage you will evaluate whether the entries from another group are similar. Likewise yours will be evaluated by another group.' + '\n[b]3.Favourites Stage:[/b] You are asked to rate the ideas produced by another group. The pay each participant receives depends on the number of stars received. Most stars → highest rank → highest pay.' + '\n[b]Final Task:[/b] You are asked to answer a series of questions. Your pay will depend on the number of correct answers relative to others in your group.' + '\n[b]Attribution:[/b] Your ideas will remain anonymous to everyone' + '\n[b]Pay:[/b] You will be paid £8.49 from completing all tasks.'

    },
    1: {
      title: 'Experiment Structure',
      text: 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it.' + '\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – In the order shown below. The final task will be completed individually.' + '\n[b]1.Task Completion Stage:[/b] You are asked to generate ideas based on the instructions provided.' + '\n[b]2.Similarities Stage:[/b] At this stage you will evaluate whether the entries from another group are similar. Likewise yours will be evaluated by another group.' + '\n[b]3.Favourites Stage:[/b] You are asked to rate the ideas produced by another group. The pay each participant receives depends on the number of stars received. Most stars → highest rank → highest pay.' + '\n[b]Final Task:[/b] You are asked to answer a series of questions. Your pay will depend on the number of correct answers relative to others in your group.' + '\n[b]Attribution:[/b] Your name will appear next to your ideas' + '\n[b]Pay:[/b] You will be paid £8.49 from completing all tasks.'

    },
    2: {
      title: 'Experiment Structure',
      text: 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it.' + '\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – In the order shown below. The final task will be completed individually.' + '\n[b]1.Task Completion Stage:[/b] You are asked to generate ideas based on the instructions provided.' + '\n[b]2.Similarities Stage:[/b] At this stage you will evaluate whether the entries from another group are similar. Likewise yours will be evaluated by another group.' + '\n[b]3.Favourites Stage:[/b] You are asked to rate the ideas produced by another group. The pay each participant receives depends on the number of stars received. Most stars → highest rank → highest pay.' + '\n[b]Final Task:[/b] You are asked to answer a series of questions. Your pay will depend on the number of correct answers relative to others in your group.' + '\n[b]Attribution:[/b] Your ideas will remain anonymous to everyone' + '\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:' + '\n1. £5.55 – Highest ranking participant' + '\n2. £2.1' + '\n3. £1' + '\n4. £0.5' + '\n5. £0 – Lowest ranking participant'

    },
    3: {
      title: 'Experiment Structure',
      text: 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it.' + '\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – In the order shown below. The final task will be completed individually.' + '\n[b]1.Task Completion Stage:[/b] You are asked to generate ideas based on the instructions provided.' + '\n[b]2.Similarities Stage:[/b] At this stage you will evaluate whether the entries from another group are similar. Likewise yours will be evaluated by another group.' + '\n[b]3.Favourites Stage:[/b] You are asked to rate the ideas produced by another group. The pay each participant receives depends on the number of stars received. Most stars → highest rank → highest pay.' + '\n[b]Final Task:[/b] You are asked to answer a series of questions. Your pay will depend on the number of correct answers relative to others in your group.' + '\n[b]Attribution:[/b] Your name will appear next to your ideas' + '\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:' + '\n1. £5.55 – Highest ranking participant' + '\n2. £2.1' + '\n3. £1' + '\n4. £0.5' + '\n5. £0 – Lowest ranking participant'

    }
  },
  alternativeObjectFigural: {
    0: {
      title: 'Line Meanings',
      text: 'There will be a line shown at the start. Come up with as many things the line reminds you of or could be a part of. Remember you have to use the whole line. You will be given 5 minutes to complete the task.' + '\n\n[b]Important note:[/b]' + '\nThere are no restrictions on what the line can remind you of or can and can’t be a part of but your idea must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.' + '\n\n[b]Pay:[/b] You will be paid £8.49 from completing all tasks.'
    },
    1: {
      title: 'Line Meanings',
      text: 'There will be a line shown at the start. Come up with as many things the line reminds you of or could be a part of. Remember you have to use the whole line. You will be given 5 minutes to complete the task.' + '\n\n[b]Important note:[/b]' + '\nThere are no restrictions on what the line can remind you of or can and can’t be a part of but your idea must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.' + '\n\n[b]Attribution:[/b] Your ideas will be seen by your group together with your name' + '\n\n[b]Pay:[/b] You will be paid £8.49 from completing all tasks.'
    },
    2: {
      title: 'Line Meanings',
      text: 'There will be a line shown at the start. Come up with as many things the line reminds you of or could be a part of. Remember you have to use the whole line. You will be given 5 minutes to complete the task.' + '\n\n[b]Important note:[/b]' + '\nThere are no restrictions on what the line can remind you of or can and can’t be a part of but your idea must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.' + '\n\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:' + '\n1. £5.55 – Highest ranking participant' + '\n2. £2.1' + '\n3. £1' + '\n4. £0.5' + '\n5. £0 – Lowest ranking participant'
    },
    3: {
      title: 'Line Meanings',
      text: 'There will be a line shown at the start. Come up with as many things the line reminds you of or could be a part of. Remember you have to use the whole line. You will be given 5 minutes to complete the task.' + '\n\n[b]Important note:[/b]' + '\nThere are no restrictions on what the line can remind you of or can and can’t be a part of but your idea must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.' + '\n\n[b]Attribution:[/b] Your ideas will be seen by your group together with your name' + '\n\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:' + '\n1. £5.55 – Highest ranking participant' + '\n2. £2.1' + '\n3. £1' + '\n4. £0.5' + '\n5. £0 – Lowest ranking participant'
    }

  },

  alternativeObject: {
    0: {
      title: 'Objects Task',
      text: 'The task is to come up with as many ideas for what a given object could be in the 5 minutes given.' + '\n[b]Completion[/b]' + '\nConsider the object given is a Coat Hanger:' + '\n • First enter the title for the object in the “title” field. For example, the alternative object could be a “back scratcher”. ' + '\n • Then fill the description field with additional information. A description is always required. A possible description could be “a tool that can be used to scratch your back”.' + '\n • Press the submit button to submit your idea' + '\nThere is no limit to how many ideas you can submit.' + '\nAll submitted entries can be seen by your group.' + '\n\nThe previous example would look like this…' + '\n[EXAMPLE]' + '\n\n[b]Pay:[/b] You will be paid £8.49 from completing all tasks.'
    },
    1: {
      title: 'Objects Task',
      text: 'The task is to come up with as many ideas for what a given object could be in the 5 minutes given.' + '\n[b]Completion[/b]' + '\nConsider the object given is a Coat Hanger:' + '\n • First enter the title for the object in the “title” field. For example, the alternative object could be a “back scratcher”. ' + '\n • Then fill the description field with additional information. A description is always required. A possible description could be “a tool that can be used to scratch your back”.' + '\n • Press the submit button to submit your idea' + '\nThere is no limit to how many ideas you can submit.' + ' All submitted entries can be seen by your group together with your name.' + '\n\nThe previous example would look like this…' + '\n[EXAMPLE]' + '\n\n[b]Pay:[/b] You will be paid £8.49 from completing all tasks.'
    },
    2: {
      title: 'Objects Task',
      text: 'The task is to come up with as many ideas for what a given object could be in the 5 minutes given.' + '\n[b]Completion[/b]' + '\nConsider the object given is a Coat Hanger:' + '\n • First enter the title for the object in the “title” field. For example, the alternative object could be a “back scratcher”. ' + '\n • Then fill the description field with additional information. A description is always required. A possible description could be “a tool that can be used to scratch your back”.' + '\n • Press the submit button to submit your idea' + '\nThere is no limit to how many ideas you can submit.' + '\nAll submitted entries can be seen by your group.' + '\n\nThe previous example would look like this…' + '\n[EXAMPLE]' + '\n\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:' + '\n1. £5.55 – Highest ranking participant' + '\n2. £2.1' + '\n3. £1' + '\n4. £0.5' + '\n5. £0 – Lowest ranking participant'

    },
    3: {
      title: 'Objects Task',
      text: 'The task is to come up with as many ideas for what a given object could be in the 5 minutes given.' + '\n[b]Completion[/b]' + '\nConsider the object given is a Coat Hanger:' + '\n • First enter the title for the object in the “title” field. For example, the alternative object could be a “back scratcher”. ' + '\n • Then fill the description field with additional information. A description is always required. A possible description could be “a tool that can be used to scratch your back”.' + '\n • Press the submit button to submit your idea' + '\nThere is no limit to how many ideas you can submit.' + ' All submitted entries can be seen by your group together with your name.' + '\n\nThe previous example would look like this…' + '\n[EXAMPLE]'
      + '\n\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:' + '\n1. £5.55 – Highest ranking participant' + '\n2. £2.1' + '\n3. £1' + '\n4. £0.5' + '\n5. £0 – Lowest ranking participant'

    }
  },

  similarities: {
    0: {
      title: 'Instructions for Similarity rounds',
      text: 'This round is completely anonymous and will not affect your pay.' + '\nA list of ideas will be shown and you are to judge whether any two are similar. If a similarity identified more than once, the later entry will be disregarded in following stages.' + '\n[b]Similarity guidelines:[/b]' + '\n1. Ideas are exact copies of each other.' + '\n2. Idea is largely expressed in an existing entry.' + '\nIdeas should be originally expressed and not be simply rewordings of each other' + '\n[b]Example:[/b]' + '\nThe following is a similarity judging example, but the final decision is up to you.  Consider the task: “come up with alternative object for a coat hanger”:' + '\n[EXAMPLE]'
      + '\n • 1 and 2 express the same idea similarly and are seen as similar.' + '\n • 3 expresses a similar idea differently and so is not similar to the first two. '
    },
    1: {
      title: 'Instructions for Similarity rounds',
      text: 'This round is completely anonymous and will not affect your pay.' + '\nA list of ideas will be shown and you are to judge whether any two are similar. If a similarity identified more than once, the later entry will be disregarded in following stages.' + '\n[b]Similarity guidelines:[/b]' + '\n1. Ideas are exact copies of each other.' + '\n2. Idea is largely expressed in an existing entry.' + '\nIdeas should be originally expressed and not be simply rewordings of each other' + '\n[b]Example:[/b]' + '\nThe following is a similarity judging example, but the final decision is up to you.  Consider the task: “come up with alternative object for a coat hanger”:' + '\n[EXAMPLE]'
      + '\n • 1 and 2 express the same idea similarly and are seen as similar.' + '\n • 3 expresses a similar idea differently and so is not similar to the first two. '
    },
    2: {
      title: 'Instructions for Similarity rounds',
      text: 'This round is completely anonymous and will not affect your pay.' + '\nA list of ideas will be shown and you are to judge whether any two are similar. If a similarity identified more than once, the later entry will be disregarded in following stages.' + '\n[b]Similarity guidelines:[/b]' + '\n1. Ideas are exact copies of each other.' + '\n2. Idea is largely expressed in an existing entry.' + '\nIdeas should be originally expressed and not be simply rewordings of each other' + '\n[b]Example:[/b]' + '\nThe following is a similarity judging example, but the final decision is up to you.  Consider the task: “come up with alternative object for a coat hanger”:' + '\n[EXAMPLE]'
      + '\n • 1 and 2 express the same idea similarly and are seen as similar.' + '\n • 3 expresses a similar idea differently and so is not similar to the first two. '
    },
    3: {
      title: 'Instructions for Similarity rounds',
      text: 'This round is completely anonymous and will not affect your pay.' + '\nA list of ideas will be shown and you are to judge whether any two are similar. If a similarity identified more than once, the later entry will be disregarded in following stages.' + '\n[b]Similarity guidelines:[/b]' + '\n1. Ideas are exact copies of each other.' + '\n2. Idea is largely expressed in an existing entry.' + '\nIdeas should be originally expressed and not be simply rewordings of each other' + '\n[b]Example:[/b]' + '\nThe following is a similarity judging example, but the final decision is up to you.  Consider the task: “come up with alternative object for a coat hanger”:' + '\n[EXAMPLE]'
      + '\n • 1 and 2 express the same idea similarly and are seen as similar.' + '\n • 3 expresses a similar idea differently and so is not similar to the first two. '
    }
  },
  favourites: {
    0: {
      title: 'Favourites rounds',
      text: 'You will be asked to name your 5 favourites ideas by giving them stars.\n' + '\nYou will be completely anonymous when giving stars.\n' + '\nThe amount of stars an individual receives for his/her ideas will determine his/her rank within their group.' + '\n[EXAMPLE]'
    },
    1: {
      title: 'Favourites rounds',
      text: 'You will be asked to name your 5 favourites ideas by giving them stars.\n' + '\nYou will be completely anonymous when giving stars.\n' + '\nThe amount of stars an individual receives for his/her ideas will determine his/her rank within their group.' + '\n[EXAMPLE]'
    },
    2: {
      title: 'Favourites rounds',
      text: 'You will be asked to name your 5 favourites ideas by giving them stars.\n' + '\nYou will be completely anonymous when giving stars.\n' + '\nThe amount of stars an individual receives for his/her ideas will determine his/her rank within their group.' + '\n[EXAMPLE]'
    },
    3: {
      title: 'Favourites rounds',
      text: 'You will be asked to name your 5 favourites ideas by giving them stars.\n' + '\nYou will be completely anonymous when giving stars.\n' + '\nThe amount of stars an individual receives for his/her ideas will determine his/her rank within their group.' + '\n[EXAMPLE]'
    }
  },
  math: {
    0: {
      title: 'Math Game Instructions',
      text: 'Solve as many addition problems as possible during the 5 minutes given. The number of correct answers will be shown when the game is over. Example seen below.' + '\n[EXAMPLE]'
    },
    1: {
      title: 'Math Game Instructions',
      text: 'Solve as many addition problems as possible during the 5 minutes given. The number of correct answers will be shown when the game is over. Example seen below.' + '\n[EXAMPLE]'
    },
    2: {
      title: 'Math Game Instructions',
      text: 'Solve as many addition problems as possible during the 5 minutes given. The number of correct answers will be shown when the game is over. Example seen below.' + '\n[EXAMPLE]' + '\n[b]Pay:[/b] Your pay will depend on your performance relative to others in your group.'
    },
    3: {
      title: 'Math Game Instructions',
      text: 'Solve as many addition problems as possible during the 5 minutes given. The number of correct answers will be shown when the game is over. Example seen below.' + '\n[EXAMPLE]' + '\n[b]Pay:[/b] Your pay will depend on your performance relative to others in your group.'
    }
  }
};

var Instructions = function (_Component) {
  (0, _inherits3.default)(Instructions, _Component);

  function Instructions(props) {
    (0, _classCallCheck3.default)(this, Instructions);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Instructions.__proto__ || (0, _getPrototypeOf2.default)(Instructions)).call(this, props));

    _this.getTaskExample = function (tasktype) {
      switch (tasktype) {
        case 'alternativeObject':
          return _react2.default.createElement(
            'div',
            { style: { marginTop: 20 } },
            _react2.default.createElement(
              _Card.Card,
              null,
              _react2.default.createElement(
                _Card.CardText,
                null,
                'Title: ',
                _react2.default.createElement(_TextField2.default, { id: 'dummy', value: 'Back Scratcher', style: { marginLeft: 10
                  } }),
                _react2.default.createElement('br', null),
                'Description: ',
                _react2.default.createElement(_TextField2.default, {
                  id: 'dummy2',
                  multiLine: true,
                  rows: 1,
                  rowsMax: 10,
                  value: 'A tool that can be used to scratch your back',
                  style: { marginLeft: 20, width: '80%'
                  } })
              )
            )
          );
        case 'alternativeObjectFigural':
          return _react2.default.createElement(
            'div',
            { style: { marginTop: 20 } },
            _react2.default.createElement(
              _Card.Card,
              null,
              _react2.default.createElement(
                _Card.CardText,
                null,
                'Title: ',
                _react2.default.createElement(_TextField2.default, { id: 'dummy', value: 'Flag', style: { marginLeft: 10
                  } }),
                _react2.default.createElement('br', null),
                'Description: ',
                _react2.default.createElement(_TextField2.default, {
                  id: 'dummy2',
                  multiLine: true,
                  rows: 1,
                  rowsMax: 10,
                  value: 'The line could be a side of a flag.',
                  style: { marginLeft: 20, width: '80%'
                  } })
              )
            )
          );
        case 'similarities':
          return _react2.default.createElement(
            'div',
            null,
            ' ',
            _react2.default.createElement(
              'div',
              { style: { padding: 5, display: 'flex' } },
              _react2.default.createElement(
                _Card.Card,
                { style: { paddingTop: '0%', fontWeight: 800 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  '1.'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardHeader,
                  { style: { padding: 8 } },
                  'Back Scratcher'
                ),
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  'Bent to scratch the back'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8, paddingTop: 28, fontWeight: 800 } },
                  'Similar to:'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  _react2.default.createElement(
                    _SelectField2.default,
                    { value: 2, onChange: function onChange() {
                        alert('This will set the selected entries as similar');
                      }, style: { width: 30 } },
                    _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: 1 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 2, primaryText: 2 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 3, primaryText: 3 })
                  )
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  _react2.default.createElement(
                    _SelectField2.default,
                    { value: -1, onChange: function onChange() {
                        alert('This will set the selected entries as similar');
                      }, style: { width: 30 } },
                    _react2.default.createElement(_MenuItem2.default, { value: 0, primaryText: 0 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: 1 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 2, primaryText: 2 })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { padding: 5, display: 'flex' } },
              _react2.default.createElement(
                _Card.Card,
                { style: { paddingTop: '0%', fontWeight: 800 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  '2.'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardHeader,
                  { style: { padding: 8 } },
                  'Leg Scratcher'
                ),
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  'Bent to scratch the leg'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8, paddingTop: 28, fontWeight: 800 } },
                  'Similar to:'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  _react2.default.createElement(
                    _SelectField2.default,
                    { value: 1, onChange: function onChange() {
                        alert('This will set the selected entries as similar');
                      }, style: { width: 30 } },
                    _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: 1 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 2, primaryText: 2 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 3, primaryText: 3 })
                  )
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  _react2.default.createElement(
                    _SelectField2.default,
                    { value: -1, onChange: function onChange() {
                        alert('This will set the selected entries as similar');
                      }, style: { width: 30 } },
                    _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: 1 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 2, primaryText: 2 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 3, primaryText: 3 })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { padding: 5, display: 'flex' } },
              _react2.default.createElement(
                _Card.Card,
                { style: { paddingTop: '0%', fontWeight: 800 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  '3.'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardHeader,
                  { style: { padding: 8 } },
                  'Reaching tool'
                ),
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  'Moulded in order to reach high places'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8, paddingTop: 28, fontWeight: 800 } },
                  'Similar to:'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  _react2.default.createElement(
                    _SelectField2.default,
                    { value: -1, onChange: function onChange() {
                        alert('This will set the selected entries as similar');
                      }, style: { width: 30 } },
                    _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: 1 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 2, primaryText: 2 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 3, primaryText: 3 })
                  )
                )
              )
            )
          );
        case 'favourites':
          return _react2.default.createElement(
            'div',
            { style: { marginTop: 20, display: 'flex' } },
            _react2.default.createElement(
              _Card.Card,
              { style: { paddingTop: '0%', fontWeight: 800 } },
              _react2.default.createElement(
                _Card.CardText,
                { style: { padding: 8 } },
                1 + '.'
              )
            ),
            _react2.default.createElement(
              _Card.Card,
              { style: { width: 460 } },
              _react2.default.createElement(
                _Card.CardHeader,
                { style: { padding: 8 } },
                'Reset button pressing tool'
              ),
              _react2.default.createElement(
                _Card.CardText,
                { style: { padding: 8 } },
                'A tool that can be used to press reset buttons which cannot be pressed with your fingers'
              )
            ),
            _react2.default.createElement(
              _Card.Card,
              null,
              _react2.default.createElement(
                _Card.CardText,
                { style: { padding: 20 } },
                _react2.default.createElement(_rater2.default, { entryIndex: 0, currentRating: 3, raterCallback: function raterCallback() {
                    alert('This is how you assign a rating');
                  } })
              )
            )
          );
        case 'math':
          return _react2.default.createElement(
            'div',
            { style: { marginTop: 20 } },
            _react2.default.createElement(
              _Card.Card,
              null,
              _react2.default.createElement(
                _Card.CardText,
                null,
                _react2.default.createElement(
                  'div',
                  null,
                  '56+73+5+10+11 =',
                  _react2.default.createElement(_TextField2.default, {
                    id: 'dummy',
                    style: {
                      paddingLeft: 10,
                      marginRight: 20
                    },
                    value: 155
                  })
                )
              )
            )
          );
        default:
          return _react2.default.createElement('div', null);

      }
    };

    _this.formatIntructionItem = function (item, example) {
      if (item.indexOf("[EXAMPLE]") > -1) {
        return example;
      } else if (item.indexOf('[b]') > -1) {
        var splits = item.replace('[b]', '').split("[/b]");
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'span',
            { style: { fontWeight: 'bold', marginRight: 5 } },
            splits[0]
          ),
          splits[1]
        );
      } else {
        return item;
      }
    };

    _this.gatherData = function () {
      if (!_this.state.isSubmitted) {
        _this.props.submit(_this.state);
        _this.setState({ isSubmitted: true });
      }
    };

    _this.state = { groupType: 0, isSubmitted: false };

    console.log("INSTRUCTIONS: " + props.payload);
    return _this;
  }

  (0, _createClass3.default)(Instructions, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log("nextProps vienen pa ca");
      console.log(nextProps);
      this.setState({
        groupType: nextProps.groupType
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ isSubmitted: false });
    }
  }, {
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'render',


    value: function render() {
      var _this2 = this;

      if ((0, _stringify2.default)(this.props.type) == "{}") {
        return _react2.default.createElement('span', null);
      }

      var textColor = this.context.muiTheme.palette.textColor;


      if ([0, 1, 2, 3].includes(this.props.groupType) == false || typeof this.props.type != 'string') {
        return _react2.default.createElement('span', null);
      }

      var groupType = this.props.groupType;
      var tasktype = this.props.type;

      var possibleTasks = ['favourites', 'math', 'similarities', 'alternativeObject', 'alternativeObjectFigural', 'experimentStructure'];
      console.log("TASK TYPE: " + tasktype);
      if (possibleTasks.indexOf(tasktype) < 0) {
        return _react2.default.createElement('div', null);
      }

      var title = instructionsData[tasktype][groupType].title;
      var text = instructionsData[tasktype][groupType].text;
      var example = this.getTaskExample(tasktype);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          {
            style: {
              padding: 30,
              margin: '2% 15% 15%',
              minWidth: 900,
              maxWidth: 1200
            }
          },
          _react2.default.createElement(_Card.CardHeader, {
            title: title,
            titleStyle: {
              fontSize: 24,
              color: textColor
            }
          }),
          _react2.default.createElement(
            _Card.CardText,
            {
              style: {
                paddingTop: 0
              }
            },
            text.split('\n').map(function (item, i) {
              return _react2.default.createElement(
                'div',
                { key: i, style: { marginBottom: 10 } },
                _this2.formatIntructionItem(item, example)
              );
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _FlatButton2.default,
              {
                id: 'ready',
                backgroundColor: 'green',
                style: { color: 'white' },
                onClick: this.gatherData
              },
              'I\'m ready'
            )
          )
        )
      );
    }
  }]);
  return Instructions;
}(_react.Component);

Instructions.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


Instructions.propTypes = {}



;var mapStateToProps = function mapStateToProps(state) {
  return {
    type: state.task.payload != undefined ? state.task.payload.taskType : null,
    groupType: state.task.payload != undefined ? state.task.payload.groupType : null
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Instructions);