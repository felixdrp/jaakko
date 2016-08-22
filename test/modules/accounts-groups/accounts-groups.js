import expect from 'expect'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  accounts,
  groups,
} from '../../../src/reducers/server';

import {
  accountsAdd,
  accountsUpdate,
  accountsRemove,

  groupsAdd,
  groupsRemove,
  groupsAddAccount,
  groupsRemoveAccount,
  moveAccounFromGroup,
} from '../../../src/actions/actions';


const store = createStore(
  combineReducers({
    accounts,
    groups,
  }),
  applyMiddleware(thunk)
);

var accountTest1 = {
  firstName: 'lucaslogin',
  surename: 'Georgetest',
  email: "lucaslogin1@sky.wl",
  token: 'fe1fef9b42879e9d0c415e69bf68b2bd',
  group: 'unassigned',
}

var accountTest2 = {
  firstName: 'Sherlock',
  surename: 'Holmes',
  email: "Sherlock@Baker.Street.co.uk",
  token: 'ae1fef9b42879e9d0c415e69bf68b2bd',
  group: 'unassigned',
}

describe('Redux register accounts in the server', () => {
  it('Adding an account', () => {
    let algo = store.dispatch( accountsAdd( accountTest1 ) )

    expect(
      store.getState().accounts[accountTest1.email]
    ).toEqual({
      firstName: 'lucaslogin',
      surename: 'Georgetest',
      email: "lucaslogin1@sky.wl",
      token: 'fe1fef9b42879e9d0c415e69bf68b2bd',
      group: 'unassigned',
    })
  })

  it('Adding a second account', () => {
    let algo = store.dispatch( accountsAdd( accountTest2 ) )

    expect(
      store.getState().accounts[accountTest2.email]
    ).toEqual({
      firstName: 'Sherlock',
      surename: 'Holmes',
      email: "Sherlock@Baker.Street.co.uk",
      token: 'ae1fef9b42879e9d0c415e69bf68b2bd',
      group: 'unassigned',
    })

    expect(
      store.getState().accounts.list.length
    ).toEqual(2)
  })

  it('Removing an account', () => {
    let algo = store.dispatch( accountsRemove( accountTest2 ) )

    expect(
      store.getState().accounts[accountTest2.email]
    ).toEqual(undefined)

    expect(
      store.getState().accounts.list.length
    ).toEqual(1)
  })

  it('Update an account', () => {
    let algo = store.dispatch( accountsUpdate({ ...accountTest1, surename: 'George' }) )

    expect(
      store.getState().accounts[accountTest1.email].surename
    ).toEqual( 'George' )
  })
})

const GROUP1 = 'G1'
const GROUP2 = 'G2'

describe('Redux register groups in the server', () => {
  it('Adding a group', () => {
    let algo = store.dispatch( groupsAdd( GROUP1 ) )

    expect(
      store.getState().groups[GROUP1]
    ).toEqual([])
  })

  it('Adding a second group', () => {
    let algo = store.dispatch( groupsAdd( GROUP2, [accountTest2.email] ) )

    expect(
      store.getState().groups[GROUP2]
    ).toEqual([accountTest2.email])

    expect(
      store.getState().groups.list.length
    ).toEqual(2)
  })

  it('Move an account from group', () => {
    let algo = store.dispatch( accountsUpdate({ ...accountTest1, group: GROUP2 }) )
    algo = store.dispatch( moveAccounFromGroup( accountTest1.email, GROUP1 ) )
    // console.log('XXXXX>>>>>>>>>>>')
    // console.log(store.getState())
    // console.log(store.getState().constructor.name)
    // console.log(JSON.stringify(store.getState()))
    expect(
      store.getState().groups[GROUP1][0]
    ).toEqual(accountTest1.email)

    expect(
      store.getState().groups[GROUP1].length
    ).toEqual(1)
  })

  // it('Update an account', () => {
  //   let algo = store.dispatch( accountsUpdate({ ...accountTest1, surename: 'George' }) )
  //   // console.log('XXXXX>>>>>>>>>>>')
  //   // console.log(store.getState())
  //   // console.log(store.getState().constructor.name)
  //   // console.log(JSON.stringify(store.getState()))
  //   expect(
  //     store.getState().accounts[accountTest1.email].surename
  //   ).toEqual( 'George' )
  // })
})
