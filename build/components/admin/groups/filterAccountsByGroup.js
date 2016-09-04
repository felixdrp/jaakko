'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterAccountsByGroup;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterAccountsByGroup(groupId, account) {
  // Filter the accounts with groups
  unassignedAccounts.list = props.accounts.list.filter(function (accountId) {
    return props.accounts[accountId].group == 'unassigned' ? true : false;
  });
  // Add accounts unassigned
  unassignedAccounts.list.map(function (accountId) {
    unassignedAccounts[accountId] = _immutable2.default.fromJS({
      firstName: props.accounts[accountId].firstName,
      email: props.accounts[accountId].email,
      selected: props.selectedAccounts.includes(accountId)
    }).toJS();
  });
}
//# sourceMappingURL=filterAccountsByGroup.js.map
