'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('material-ui/styles/colors');

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _colorManipulator2 = _interopRequireDefault(_colorManipulator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  spacing: _colorManipulator2.default,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#3F51B5',
    primary2Color: 'white',
    primary3Color: _colors.grey600,
    // accent1Color: pinkA200,
    // accent2Color: pinkA400,
    // accent3Color: pinkA100,
    textColor: '#333333',
    // alternateTextColor: '#303030',
    // canvasColor: '#303030',
    // borderColor: fade(fullWhite, 0.3),
    // disabledColor: fade(fullWhite, 0.3),
    // pickerHeaderColor: fade(fullWhite, 0.12),
    // clockCircleColor: fade(fullWhite, 0.12),
    selectionColor: '#303030',
    selectionBackground: '#f0f030',
    chip: '#efefef',
    chipSelected: '#ff5f5f'
  }
};
// event.nativeEvent.stopPropagation();
// event.nativeEvent.stopImmediatePropagation();
//# sourceMappingURL=muiLMSTheme.js.map
