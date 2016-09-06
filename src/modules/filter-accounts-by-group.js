import Immutable from 'immutable'

/*
* groupId
* accounts
* selectedAccounts
*/

export default function filterAccountsByGroup(groupId, accounts, selectedAccounts=[]) {
  let filteredAccounts = {
    list: []
  }
  // Filter the accounts with groups
  filteredAccounts.list = accounts.list.filter(
    (accountId) => accounts[accountId].group == groupId? true: false
  )
  // Add accounts unassigned
  filteredAccounts.list.map(
    (accountId) => {
      filteredAccounts[accountId] = Immutable.fromJS({
        firstName: accounts[accountId].firstName,
        email: accounts[accountId].email,
        selected: selectedAccounts.includes(accountId),
      }).toJS()
    }
  )

  return filteredAccounts
}
