// mocha -t 10000 --compilers js:babel-core/register --require babel-polyfill ./test/e2e/account/vc-signup-test.js

import chai from 'chai'
import { should, expect } from 'chai'

import AccountPage from './page-object'

import Vcdb from './dbvc'
let dbvc = new Vcdb()

const account = {
        firstName: 'Lucas',
        surname: 'George',
        email: "@sky.wl",
        password: '!aBcD1234',
        reEnterPassword: '$!BcD1234',
        job: 'jedy',
        company: 'republic',
        hometown: 'Glasgow, United Kingdom',
        current_location: 'Glasgow, United Kingdom'
      }
// const urlBase = 'https://localhost:8008'
const urlBase = 'http://local.thegither.com:3000'
const email = `${account.firstName}.${account.surname}${account.email}`

let humanCheck = true,
    urlSignup = urlBase + '/usersignup',
    urlLogin = urlBase + '/login';

require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, until, Key} = webdriver;

const initWindow = () => new webdriver.Builder()
        .forBrowser('chrome')
        .build();
        // new selenium.Builder().
        //     withCapabilities(selenium.Capabilities.chrome()).
        //     build();

let driver = initWindow();

const accPag = new AccountPage(driver)

let domElement,
    html,
    body,
    tabs,
    field;

describe('Account:', () => {
  // db.getCollection('user').find({firstname: 'Lucas', lastname: 'George'})
  after(async () => {
    return await dbvc.deleteUser({email})
  });

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
        Email: email
      })

      driver.wait(until.elementLocated(
        By.js( () => document.querySelector('#alerts span span') )
      ), 2000)

      response = await driver.findElement(
        By.js( () => document.querySelector('#alerts span span') )
      ).getText()
      // await driver.quit()
      expect( response ).to.be.equal('Email invitation sent')
    });

    it('Go to customer data collection invitation page ', async function() {
      // driver = initWindow();
      // accPag.setDriver(driver)

      // Give time to the server to process the invitation email
      await new Promise((resolve, reject)=>setTimeout(()=>resolve(true), 1000))

      let response
      let emailInvitations = await dbvc.getSignupInvitations({email})
      await accPag.navigate(emailInvitations[0].content.invite_url)

      await accPag.waitFor({query: 'form[name=signupForm]', time: 3000})

      // ### Basic form
      // Title select
      await accPag.click({query: 'button[name=title]'})
      await driver.findElement(
        By.js( () => {
          let elements = document.querySelectorAll('ul[role=select] li')
          let index
          elements.forEach((v, i) => {
            if (v.textContent.includes('Dr')) {
              index = i
            }
          })
          return elements.item(index)
        })
      ).click()

      // Roles select
      await accPag.click({query: 'button[name=roles]'})
      await driver.findElement(
        By.js( () => {
          let elements = document.querySelectorAll('ul[role=select] li')
          let index
          // Market , Metals
          elements.forEach((v, i) => {
            if (v.textContent.includes('Metals')) {
              index = i
            }
          })
          return elements.item(index)
        })
      ).click()
      // Accept conditions
      await accPag.click({query: '.bootstrap-switch'})
      // Input continue
      await accPag.click({query: 'button[type=submit]'})

      // ### Professional form
      // Wait by new page
      await accPag.waitFor({query: 'input[name=job]', time: 3000})
      // Current job
      await accPag.sendKeys({query: 'input[name=job]', keys: account.job})
      // Current company
      await accPag.sendKeys({query: 'input[name=company]', keys: account.company})
      // Input continue
      await accPag.click({query: 'button[type=submit]'})

      // ### Current form
      // Wait by new page
      await accPag.waitFor({query: 'input[name=hometown]', time: 3000})
      // Hometown
      await accPag.locationGoogleSDropdownSelector({
        query: 'input[name=hometown]',
        defaultLocation: account.hometown
      })
      // Current Location
      await accPag.locationGoogleSDropdownSelector({
        query: 'input[name=current_location]',
        defaultLocation: account.hometown
      })
      // Input continue
      await accPag.click({query: 'button[type=submit]'})

      // ### Future form
      // Input continue
      await accPag.click({query: 'button[type=submit]'})

      // ### Connections form
      // Wait by new page
      await accPag.waitFor({query: 'input[name=password][type=password]', time: 3000})
      // Password
      await accPag.sendKeys({
        query: 'input[name=password][type=password]',
        keys: account.password
      })
      // Password
      await accPag.sendKeys({
        query: 'input[name=confirmation][type=password]',
        keys: account.password
      })
      // Input continue
      // await accPag.click({query: 'button[type=submit]'})



      console.log(response)

      // response = await driver.findElement(
      //   By.js( () => document.querySelector('#alerts span span') )
      // ).getText()

      // console.log(
      //   await dbvc.getSignupInvitations({email})
      // )

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
