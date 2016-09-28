 // mocha --watch --compilers js:babel-core/register --require babel-polyfill --timeout 5000 "test/modules/survey-monettary-results-test.js"
import chai from 'chai'
import { should, expect } from 'chai'
// import chaiAsPromised from 'chai-as-promised'

import React, { PropTypes, Component } from 'react'

import data from '../../prueba.json'


let surveyxMonetaryTypeIndex = data.session.surveyPath.reduce(
  (prev, element, index) => {
    // The survey have a monetary value?
    if (element.type == 'RESULTS' || element.type == 'MATH_RESULTS') {
      prev.push( index )
      return prev
    }
    return prev
  },
  []
)

describe('Show results:', () => {
  it('Filter the results by survey type', async () => {
    expect(surveyxMonetaryTypeIndex).to.be.equal('511fef9b42879e9d0c415e69bf68b2bd');
  });

  it('Create an array with accounts and its results.', async () => {
    let accountsMonetary = data.accounts.list.reduce(
      ( prev, account, index ) => {
        let accountComponent = []

        accountComponent.push( <span key={account.email}> {account.firstName} {account.surname} {account.email} </span> )

        let moneyData = data.results.surveyInfo.filter(
          (element) => element.accountId == account && surveyxMonetaryTypeIndex.includes( element.surveyId )
        )

        moneyData.forEach(
          (current, index2) => {
            if ( index2 < moneyData.length - 1 ) {
              accountComponent.push( <span key={account.email + index2}> {account.firstName} {account.surname} {account.email} </span> )
            } else {
              accountComponent.push( <span key={account.email + index2}> {account.firstName} {account.surname} {account.email} </span> )
            }
          }
        )

        prev.push( <div key={index}> {accountComponent} </div> )

        return prev
      },
      []
    )
    expect(accountsMonetary).to.be.equal('511fef9b42879e9d0c415e69bf68b2bd');
  });
});
