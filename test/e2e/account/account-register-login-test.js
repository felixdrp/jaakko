import chai from 'chai'
import { should, expect } from 'chai'

import { deleteAccount } from '../../../src/modules/account/delete-account'

require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;

const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

const account = {
        firstName: 'lucas',
        surename: 'George1',
        email: "e2elucas1@sky.wl",
        password: 'GeorgeLuc@as1',
        reEnterPassword: 'GeorgeLuc@as1',
      }
const urlBase = 'https://localhost:8008'
describe('Account:', () => {
  let humanCheck = true,
      urlSignup = urlBase + '/account/signup',
      urlLogin = urlBase + '/account/signin';

  // before(() => )
  describe('Register:', () => {
    it('Check all fields give empty message.', async function() {
      let domElement,
          html,
          field;

      driver.navigate().to( urlSignup )
      driver.wait(until.elementLocated(By.id('submitRegisterAccount')), 1000)

      for (field in account) {
        driver.findElement( By.id(field) ).sendKeys('')
      }

      for (field in account) {
        domElement = driver.findElement( By.id(field) )

        domElement.sendKeys('')

        // Wait message appear
        driver.wait(function() {
          return driver.executeScript(
            "console.log(arguments[0].parentNode.childNodes[4].tagName);" +
            "return arguments[0].parentNode.childNodes[4].tagName;",
            domElement
          ).then((div)=> div === 'DIV')
        }, 1000 )

        html =  await driver.executeScript(
          "return arguments[0].parentNode.innerHTML;", domElement
        )
        expect( html.includes('empty') ).to.be.true
      }
    });

    it('Register an account', function() {
      driver.navigate().to( urlSignup )
      driver.wait(until.elementLocated(By.id('submitRegisterAccount')), 2000)
      for (let field in account) {
        driver.findElement(By.id(field)).sendKeys(account[field]);
      }
      driver.findElement(By.id('submitRegisterAccount')).click();

      deleteAccount({...account})
      // Wait for the login cookie from server
      return driver.wait(
        function() {
          return driver.executeAsyncScript( function() {
            var callback = arguments[arguments.length - 1];
            let token = /(?:token=)(\w*)/.exec(document.cookie)
            callback( token )
          } )
        }, 1000
      )

      // if (humanCheck) {
      //   driver.sleep(500)
      // }
      //
      // driver.navigate().to('http://localhost:8000/account/signin')
      //
      // driver.manage().timeouts().setScriptTimeout(1000)
      //
      // var start = new Date().getTime();
      // driver.executeAsyncScript(
      //     'window.setTimeout(arguments[arguments.length - 1], 500);').
      //     then(function() {
      //       console.log(
      //           'Elapsed time: ' + (new Date().getTime() - start) + ' ms');
      //     });
      //
      // let cookie = driver.executeAsyncScript(function() {
      //   var callback = arguments[arguments.length - 1];
      //   window.document.cookie='mlk=yeahh'
      //   callback(window.document.cookie)
      // })

      // console.log(cookie);


      // let window = await webdriver.manage.window()
      // // let window = await driver.getWindowHandle()
      // console.log('cookie>> ' + window.document.cookie)


      // driver.wait(until.elementLocated(By.css('.suggestion')));
      // return cookie
    });
  });
  describe('Login:', () => {
    it('Login Check all fields give empty message.', async function() {
      let loginAccount = {
        email: 'e2elucasLogin1@sky.wl',
        password: account.password,
      }
      let domElement,
          html,
          field;

      driver.navigate().to( urlLogin )
      driver.wait(until.elementLocated(By.id('submitLoginAccount')), 1000)

      for (field in loginAccount) {
        driver.findElement( By.id(field) ).sendKeys('')
      }

      for (field in loginAccount) {
        domElement = driver.findElement( By.id(field) )

        domElement.sendKeys('')

        // Wait message appear
        driver.wait(function() {
          return driver.executeScript(
            "console.log(arguments[0].parentNode.childNodes[4].tagName);" +
            "return arguments[0].parentNode.childNodes[4].tagName;",
            domElement
          ).then((div)=> div === 'DIV')
        }, 1000 )

        html =  await driver.executeScript(
          "return arguments[0].parentNode.innerHTML;", domElement
        )
        expect( html.includes('empty') ).to.be.true
      }
    });

    it('Login an account', function() {
      // create account
      let loginAccount = {
        email: 'e2elucasLogin1@sky.wl',
        password: account.password,
      }

      driver.navigate().to( urlLogin )
      driver.wait(until.elementLocated(By.id('submitLoginAccount')), 2000)
      for (let field in loginAccount) {
        driver.findElement(By.id(field)).sendKeys(loginAccount[field]);
      }
      driver.findElement(By.id('submitLoginAccount')).click();

      // deleteAccount({...account})
      // Wait for the login cookie from server
      driver.wait(
        function() {
          return driver.executeAsyncScript( function() {
            var callback = arguments[arguments.length - 1];
            let token = /(?:token=)(\w*)/.exec(document.cookie)
            callback( token )
          } )
        }, 1000
      )

      if (humanCheck) {
        return driver.sleep(2000)
      }

      //
      // if (humanCheck) {
      //   driver.sleep(500)
      // }
      //
      // driver.navigate().to('http://localhost:8000/account/signin')
      //
      // driver.manage().timeouts().setScriptTimeout(1000)
      //
      // var start = new Date().getTime();
      // driver.executeAsyncScript(
      //   'window.setTimeout(arguments[arguments.length - 1], 500);').
      //   then(function() {
      //     console.log(
      //       'Elapsed time: ' + (new Date().getTime() - start) + ' ms');
      //     });
      //
      //     let cookie = driver.executeAsyncScript(function() {
      //       var callback = arguments[arguments.length - 1];
      //       window.document.cookie='mlk=yeahh'
      //       callback(window.document.cookie)
      //     })
      //
      //     // console.log(cookie);
      //
      //
      //     // let window = await webdriver.manage.window()
      //     // // let window = await driver.getWindowHandle()
      //     // console.log('cookie>> ' + window.document.cookie)
      //
      //
      //     // driver.wait(until.elementLocated(By.css('.suggestion')));
      //     return cookie
    });
  });

  after(() => driver.quit())
});
