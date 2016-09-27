import chai from 'chai'
import { should, expect } from 'chai'
// import chaiAsPromised from 'chai-as-promised'

import data from './'


let surveyxMonetaryTypeIndex = this.props.storeSession.session.surveyPath.reduce(
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

let accounts = this.props.storeSession.accounts.list.map(
  ( account, index ) => {
    let accountComponent = []
    accountComponent.push( <span key={account.email}> {account.firstName} {account.surname} {account.email} </span> )
    let moneyData = this.props.storeSession.results.filter(
      (element) => element.creator == account && surveyxMonetaryTypeIndex.includes( element. )
    )
    accountComponent = [
      ...accountComponent,
      ...this.props.storeSession.reduce(
        (prev, current, index) => {
          if (  ) {

          } else {

          }
        },
        []
      )
    ]
    return <div key={index}> accountComponent </div>
  }
