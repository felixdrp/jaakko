import chai from 'chai'
import { should, expect } from 'chai'
// import chaiAsPromised from 'chai-as-promised'

import { MongoClient, ObjectID } from 'mongodb'
import {mongodbConf} from '../../../src/config'
import {reportError} from '../../../src/modules/log/error'

import {loginAccount} from '../../../src/modules/account/login-account';
import {createAccount} from '../../../src/modules/account/create-account';
import {deleteAccount} from '../../../src/modules/account/delete-account';


describe('Login account:', () => {
  describe('Check input fields:', () => {
    it('It receive no fields', async () => {
      let result = await loginAccount()

      expect({
        message: result.message,
        deepMessage: result.deepMessage,
      }).to.deep.equal({
        message: 'Login input type not valid',
        deepMessage: 'Input fields is not an object type.',
      });
    });
  });

  describe('Check interaction with database:', () => {
    it('Account not found', async () => {
      let fields = {
        firstName: 'lucaslogin',
        surename: 'Georgetest',
        email: "lucaslogin1@sky.wl",
        password: 'GeorgeLuc@as1',
        reEnterPassword: 'GeorgeLuc@as1',
      }

      let result = await loginAccount(fields)

      expect({
        message: result.message,
        deepMessage: result.deepMessage,
      }).to.deep.equal({
        message: 'Account Email not found.',
        deepMessage: 'Account Email not found.',
      });
    });

    it('Account was found. Error in password.(register uses bcryt... takes time)', async () => {
      let fields = {
        firstName: 'lucaslogin2',
        surename: 'Georgetest2',
        email: "lucaslogin2@sky.wl",
        password: 'GeorgeLuc@as2',
        reEnterPassword: 'GeorgeLuc@as2',
      }
      let result = null;
      console.log('>>>>>>>>>>>>>>>>>>')

      // Create Account
      result = await createAccount({...fields})
      console.log('>>>>>>>>>>>>>>>>>>')

      // Login ok
      result = await loginAccount({...fields, password: 'Random1_?password'})
      console.log('>>>>>>>>>>>>>>>>>>')

      // Delete Account
      await deleteAccount(fields)
      console.log('>>>>>>>>>>>>>>>>>>')
      console.log(JSON.stringify(result))
      expect({
        message: result.message,
        deepMessage: result.deepMessage,
      }).to.deep.equal({
        message: 'Password not valid.',
        deepMessage: 'The input password is not the same as the account\'s password',
      });
    });

    it('Account was found. Valid password.(register uses bcryt... takes time)', async () => {
      let fields = {
        firstName: 'lucaslogin2',
        surename: 'Georgetest2',
        email: "lucaslogin2@sky.wl",
        password: 'GeorgeLuc@as2',
        reEnterPassword: 'GeorgeLuc@as2',
        token: 'fe1fef9b42879e9d0c415e69bf68b2bd'
      }
      let result = null;

      // Create Account
      result = await createAccount({...fields})

      // Login ok
      result = await loginAccount({...fields, password: 'GeorgeLuc@as2'})

      // Delete Account
      await deleteAccount(fields)

      expect(result.token).to.equal('fe1fef9b42879e9d0c415e69bf68b2bd');
    });
  });
});
