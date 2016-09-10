import AccountPage from './page-object'

// import { deleteAccount } from '../../../src/modules/account/delete-account'

const account = {
        firstName: 'lucas',
        surename: 'George',
        email: "@sky.wl",
        password: '1234',
        reEnterPassword: '1234',
      }
const urlBase = 'https://localhost:8008'
let humanCheck = true,
    urlSignup = urlBase + '/account/signup',
    urlLogin = urlBase + '/account/signin';

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

function login() {
  setTimeout(
    async () => {
      console.log(':-) ending> ' + i)
      accPag.navigate(urlLogin)
      driver.wait(until.elementLocated(By.id('submitLoginAccount')), 2000)
      await accPag.loginAccount({
        email: account.firstName + i + '.' + account.surename + account.email,
        password: account.password,
      })
      // await driver.quit()
    },
    Math.floor( Math.random() * 1000 )
  )
}

login()
