'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterAccountsByGroup;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterAccountsByGroup(groupId, accounts, selectedAccounts) {
  var filteredAccounts = {
    list: []
  };
  // Filter the accounts with groups
  filteredAccounts.list = accounts.list.filter(function (accountId) {
    return accounts[accountId].group == groupId ? true : false;
  });
  // Add accounts unassigned
  filteredAccounts.list.map(function (accountId) {
    filteredAccounts[accountId] = _immutable2.default.fromJS({
      firstName: accounts[accountId].firstName,
      email: accounts[accountId].email,
      selected: selectedAccounts.includes(accountId)
    }).toJS();
  });

  return filteredAccounts;
}
//# sourceMappingURL=filter-accounts-by-group.js.map
