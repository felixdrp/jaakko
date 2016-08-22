import expect from 'expect'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//
// function rootReducer(state = { uno: true }, action) {
//   switch (action.type) {
//   case 'uno':
//     return { uno: false }
//   default:
//     return state
//   }
// }
//
// // Note: this API requires redux@>=3.1.0
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );
//
// function tryToLogin(account) {
//   return (dispatch, getState) => {
//     return login(account).then(
//       value => {dispatch({type: value}); console.log(getState())},
//       error => {console.log("apologize('The login data ', account.email, error)");  }
//     );
//   };
// }
//
// function login(account) {
//   return new Promise((resolve, reject) => {
//     setTimeout( () => {return Math.random() < 0.5 ? resolve('uno'): reject('fallo!!') } , 1000)
//   })
// }
//
// describe('Async actions with thunk', () => {
//   it('should fail sometimes', async () => {
//     let algo = await store.dispatch(tryToLogin({email:'felix'}))
//     expect(
//       store.getState()
//     ).toEqual({ uno: false })
//   })
// })
