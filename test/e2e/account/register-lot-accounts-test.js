// mocha --no-timeouts --compilers js:babel-core/register --require babel-polyfill --recursive test/e2e/account/register-lot-accounts-test.js

import chai from 'chai'
import { should, expect } from 'chai'
import AccountPage from './page-object'

// import { deleteAccount } from '../../../src/modules/account/delete-account'

require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, until, Key } = webdriver;

const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

const account = {
        firstName: 'lucas',
        surename: 'George',
        email: "@sky.wl",
        password: '1234',
        reEnterPassword: '1234',
      }
const urlBase = 'https://localhost:8008'


const accPag = new AccountPage(driver)

describe('Account:', () => {
  let humanCheck = true,
      urlSignup = urlBase + '/account/signup',
      urlLogin = urlBase + '/account/signin';

  // before(() => )
  describe('Register:', () => {
    it('Check all fields give empty message.', async function() {
      let domElement,
          html,
          body,
          tabs,
          field;

      // driver.navigate().to( urlSignup )
      // driver.navigate().to( urlLogin )
      accPag.navigate(urlSignup)
      // await driver.wait(until.elementLocated(By.id('submitRegisterAccount')), 3000)

      body = await accPag.getBodyElement()

      for (let i = 0; i < 20; i++) {
        body.sendKeys(Key.CONTROL + "t")
      }

      tabs = await driver.getAllWindowHandles()
      console.log(tabs)

      // Register 20 accounts :)
      for (let i = 1, tab; i < 21; i++) {
        tab = tabs[i]
        console.log(tab)
        await driver.switchTo().window( tab )
        await accPag.navigate( urlSignup )
        await accPag.registerAccount({
          ...account,
          email: account.firstName + i + '.' + account.surename + account.email
        })
      }

    });
  });

  // after(() => driver.quit())
});
