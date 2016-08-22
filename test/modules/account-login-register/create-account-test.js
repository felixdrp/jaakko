import chai from 'chai'
import { should, expect } from 'chai'
// import chaiAsPromised from 'chai-as-promised'

import { createAccount } from '../../../src/modules/account/create-account';
import { deleteAccount } from '../../../src/modules/account/delete-account';
import field from '../../../src/modules/check-field';

import { MongoClient } from 'mongodb'
import { mongodbConf } from '../../../src/config'
import { reportError } from '../../../src/modules/log/error'

import { isUserInDB } from '../is-user-in-db'

describe('Create account function:', () => {
  describe('Check input fields:', () => {
    it('It receive no fields', async () => {
      let result = await createAccount()

      expect({
        message: result.message,
        deepMessage: result.deepMessage,
      }).to.deep.equal({
        message: 'Register input type not valid',
        deepMessage: 'Input fields is not an object type.',
      });
    });
    // Check with first name and surename

    // Minimum length: 1 characters
    // Maximum length: 15 characters
    // Must begin with a letter or number
    // All other characters can be a letter, number or underscore

    describe('First name', () => {
      it('Length less than min', async () => {
        let result = await createAccount({firstName: 'lucas'}, { firstName: {min: 6} })
        expect(result.deepMessage).to.equal( 'The field is too short' );
        expect(result.message).to.equal( 'The input field firstName not valid' );
      })
      it('Length more than max', async () => {
        let result = await createAccount({firstName: 'lucas'}, { firstName: {max: 3} })
        expect(result.deepMessage).to.equal( 'The field is too long' );
        expect(result.message).to.equal( 'The input field firstName not valid' );
      })
      it('It have a no valid character', async () => {
        let result = await createAccount({firstName: 'luc@s'}, { firstName: {type: 'alphanumeric'} })
        expect(result.deepMessage).to.equal( 'The field firstName constains a not valid character' );
        expect(result.message).to.equal( 'The input field firstName not valid' );
      })
    });

    describe('Surename', () => {
      it('Length less than min', async () => {
        let result = await createAccount({firstName: 'lucas', surename: 'George'}, { surename: {min: 10} })
        expect(result.deepMessage).to.equal( 'The field is too short' );
        expect(result.message).to.equal( 'The input field surename not valid' );
      })
      it('Length more than max', async () => {
        let result = await createAccount({firstName: 'lucas', surename: 'George'}, { surename: {max: 3} })
        expect(result.deepMessage).to.equal( 'The field is too long' );
        expect(result.message).to.equal( 'The input field surename not valid' );
      })
      it('It have a no valid character', async () => {
        // It have a no valid character
        let result = await createAccount({firstName: 'lucas', surename: 'Geor$e'}, { surename: {type: 'alphanumeric'} })
        expect(result.deepMessage).to.equal( 'The field surename constains a not valid character' );
        expect(result.message).to.equal( 'The input field surename not valid' );
      })
    });

    describe('Email', () => {
      let fields = {
        firstName: 'lucas',
        surename: 'George',
        password: 'GeorgeLuc@as1',
        reEnterPassword: 'GeorgeL',
      }
      it('is Empty', async () => {
        let result = await createAccount({...fields, email: ''}, { email: {min: 30, max:100} })
        expect(result.deepMessage).to.equal( 'The field is too short' );
        expect(result.message).to.equal( 'The input field email not valid' );
      })
      it('Length less than min', async () => {
        let result = await createAccount({...fields, email: 'lucas@sky.wl'}, { email: {min: 30, max:100} })
        expect(result.deepMessage).to.equal( 'The field is too short' );
        expect(result.message).to.equal( 'The input field email not valid' );
      })
      it('Length more than max', async () => {
        let result = await createAccount({...fields, email: 'lucas@sky.wl'}, { email: {min: 8, max:9} })
        expect(result.deepMessage).to.equal( 'The field is too long' );
        expect(result.message).to.equal( 'The input field email not valid' );
      })
      it('It have a no valid email', async () => {
        let result = await createAccount({...fields, email: 'lucasAsky.walker'}, { email: {min: 8, max:100} })
        expect(result.deepMessage).to.equal( 'The field email is not a valid email' );
        expect(result.message).to.equal( 'The input field email is not a valid email' );
      });
    });

    describe('Password', () => {
      let fields = {
        firstName: 'lucas',
        surename: 'George',
        email: "lucas@sky.wl",
        reEnterPassword: 'GeorgeLuc@as222',
      }
      it('Length less than min', async () => {
        let result = await createAccount({...fields, password: 'Geeas1'}, { password: {min: 30} })
        expect(result.deepMessage).to.equal( 'The field is too short' );
        expect(result.message).to.equal( 'The input field password not valid' );
      })
      it('Length more than max', async () => {
        let result = await createAccount({...fields, password: 'Geeas1'}, { password: {min: 3, max:4} })
        expect(result.deepMessage).to.equal( 'The field is too long' );
        expect(result.message).to.equal( 'The input field password not valid' );
      })
      it('It have enough symbols', async () => {
        let result = await createAccount({...fields, password: 'Geeas1'}, { password: {symbols: 0} })
        expect(result.deepMessage).to.equal( 'Fields password and re enter password are not equal' );
        expect(result.message).to.equal( 'Register input fields password and re enter password are not equal.' );
      })
      it('It have not enough symbols', async () => {
        // It have a no valid password. It need a symbol.
        let result = await createAccount({...fields, password: 'Geeas1'}, { password: {symbols: 1} })
        expect(result.deepMessage).to.equal( 'The field password not valid' );
        expect(result.message).to.equal( 'The input field password not valid' );
      })
      it('password and reEnterPassword are equal', async () => {
        let fields = {
          firstName: 'lucas',
          surename: 'George',
          email: "lucas@sky.wl",
          password: 'GeorgeLuc@as1',
          reEnterPassword: 'GeorgeLuc@as222',
        }

        let result = await createAccount({...fields})
        expect(result.deepMessage).to.equal( 'Fields password and re enter password are not equal' );
        expect(result.message).to.equal( 'Register input fields password and re enter password are not equal.' );
      })
    });

    describe('Token and option mustHave', () => {
      let fields = {
        firstName: 'lucas',
        surename: 'George',
        password: 'GeorgeLuc@as1',
        reEnterPassword: 'GeorgeLuc@as1',
        email: 'lucas@sky.wl',
      }
      it('Token Not valid and must have = true .', async () => {
        let result = await createAccount(
          {...fields, token: 'invalid_TOKEN_________________32'},
          { token: {mustHave: true} }
        )
        expect(result.deepMessage).to.equal( 'The field token is not a valid token' );
        expect(result.message).to.equal( 'The input field token is not a valid token' );
      })
      it('Token empty and must have = true .', async () => {
        let result = await createAccount(
          {...fields, token: ''},
          { token: {mustHave: true} }
        )
        expect(result.deepMessage).to.equal( 'The field is too short' );
        expect(result.message).to.equal( 'The input field token not valid' );
      })
      it('Token valid and must have = true.(register uses bcryt... takes time)', async () => {
        let inputFields = {
          ...fields,
          email: 'lucast1@sky.wl',
          token: '611fef9b42879e9d0c415e69bf68b2bd'
        }
        let result = await createAccount(
          inputFields,
          { token: {mustHave: true} }
        )
        // Remove account
        await deleteAccount(inputFields)
        expect(result).to.be.equal('611fef9b42879e9d0c415e69bf68b2bd');
      })
      it('Token empty and must have = false.(register uses bcryt... takes time)', async () => {
        let inputFields = {
          ...fields,
          email: 'lucast2@sky.wl',
          token: ''
        }
        let result = await createAccount(
          inputFields,
          { token: {mustHave: false} }
        )
        // Remove account
        await deleteAccount(inputFields)
        expect( field.check('token', result, {token:{type:'token'}}) ).to.be.true;
      })
      it('Token valid and must have = false.(register uses bcryt... takes time)', async () => {
        let inputFields = {
          ...fields,
          email: 'lucast3@sky.wl',
          token: '511fef9b42879e9d0c415e69bf68b2bd'
        }
        let result = await createAccount(
          inputFields,
          { token: {mustHave: false} }
        )
        // Remove account
        await deleteAccount(inputFields)
        expect(result).to.be.equal('511fef9b42879e9d0c415e69bf68b2bd');
      })
    });
  });

  describe('Check interaction with database:', () => {
    it('The email is not already taken', async () => {
      let fields = {
        firstName: 'lucas1',
        surename: 'George1',
        email: "lucas1@sky.wl",
        password: 'GeorgeLuc@as1',
        reEnterPassword: 'GeorgeLuc@as1',
      }
      expect( await isUserInDB(fields) ).to.be.false;
    });

    it('An account is created and removed.(register uses bcryt... takes time)', async () => {
      let fields = {
        firstName: 'lucas2',
        surename: 'George2',
        email: 'lucas2@sky.wl',
        password: 'GeorgeLuc@as1',
        reEnterPassword: 'GeorgeLuc@as1',
      }
      let result = null;

      try {

              result = await isUserInDB(fields)
              // Check email is not taken
              expect( result ).to.be.false;

              // Add acount
              result = await createAccount({...fields})

              // Check email was created
              result = await isUserInDB(fields)
              if (result === false) {
                result = reportError(
                  'User not created.',
                  'It was an error registering user.',
                  'ACCOUNT_REGISTER_ERROR',
                  '719b4603-4796-4f2d-b452-20aaafdcfb46',
                )
              }
              expect( result.email ).to.be.equal( 'lucas2@sky.wl' );

              // Remove account
              result = await deleteAccount({...fields})
              result = await isUserInDB(fields)

              // Check email is not taken
              expect( result ).to.be.false;
      } catch (e) {
        throw e
      }


    });
  });
});
