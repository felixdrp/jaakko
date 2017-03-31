// mocha -t 10000 --compilers js:babel-core/register --require babel-polyfill ./test/e2e/account/vc-signup-test.js

import chai from 'chai'
import { should, expect } from 'chai'

import AccountPage from './page-object'

// import { deleteAccount } from '../../../src/modules/account/delete-account'

const account = {
        firstName: 'Lucas',
        surname: 'George',
        email: "@sky.wl",
        password: '1234',
        reEnterPassword: '1234',
      }
// const urlBase = 'https://localhost:8008'
const urlBase = 'http://local.thegither.com:3000'

let humanCheck = true,
    urlSignup = urlBase + '/usersignup',
    urlLogin = urlBase + '/login';

require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, until, Key } = webdriver;
const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

const accPag = new AccountPage(driver)

let i = process.argv[2] || 1

let domElement,
    html,
    body,
    tabs,
    field;

describe('Account:', () => {
  describe('signup:', () => {
    it('Go to signup page', async function() {
      accPag.navigate(urlSignup)
      return driver.wait(until.elementLocated(
        By.js( () => document.querySelector('form[name=signupForm]') )
      ), 2000)
    });

    it('Register a customer', async function() {
      let response
      await accPag.registerAccount({
        Firstname: account.firstName,
        Lastname: account.surname,
        Email: `${account.firstName}.${account.surname}${account.email}`
      })

      driver.wait(until.elementLocated(
        By.js( () => document.querySelector('#alerts span span') )
      ), 2000)

      response = await driver.findElement(
        By.js( () => document.querySelector('#alerts span span') )
      ).getText()

      expect( response ).to.be.equal('Email invitation sent')
    });
  });

  // describe('Login:', () => {
  //   it('Login account not valid',async function() {
  //     let response
  //     accPag.navigate(urlLogin)
  //     driver.wait(until.elementLocated(By.id('loginForm')), 2000)
  //
  //     await accPag.loginAccount({
  //       email: account.firstName + i + '.' + account.surname + account.email,
  //       password: account.password,
  //     })
  //
  //     driver.wait(until.elementLocated(
  //       By.js( () => document.querySelector('#alerts span span') )
  //     ), 2000)
  //
  //     response = await driver.findElement(
  //         By.js( () => document.querySelector('#alerts span span') )
  //     ).getText()
  //
  //     expect( response ).to.be.equal('Unable to login, invalid credentials.')
  //   });
  // });
});
