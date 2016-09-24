import deepmerge from 'deepmerge'
import field from '../check-field'
import {reportError} from '../log/error'
import { MongoClient, ObjectID } from 'mongodb'
import { mongodbConf, fieldsOptions } from '../../config'
import { createToken } from '../token-generator'
import bcrypt from 'bcryptjs'

export async function loginAccount(input, options) {
  // Check input fields
  if (!input || typeof input !== 'object' ) {
    return reportError(
      'Login input type not valid',
      'Input fields is not an object type.',
      'LOGIN_TYPE_ERROR',
      '0d8969d0-102d-4ece-a742-4aad7cead869',
    )
  }

  let error = {};

  let fields = {
    email: input.email || '',
    password: input.password || '',
    hash: input.hash || '',
  }

  let newfieldsOptions

  if (options && typeof options === 'object' ) {
    newfieldsOptions = deepmerge( fieldsOptions, options )
  } else {
    newfieldsOptions = {...fieldsOptions}
  }

  // Remove options don't used by loginAccount
  for (let option in newfieldsOptions) {
    switch (option) {
      case 'email':
      case 'password':
      case 'hash':
        continue
      default:
        delete newfieldsOptions[option]
    }
  }
  // console.log('LLL> ' + Object.keys(newfieldsOptions))

  // Check fields with its options
  error = field.checkAll(fields, newfieldsOptions)

  if (error !== null) {
    return error
  }

  // Check login
  let db = null,
      colUser = null,
      res  = null,
      token = null,
      passport = null,
      user = null;

  try {
    db = await MongoClient.connect(mongodbConf.url)
    // Check the user/email is not taken
    colUser = db.collection('User')
    user = await colUser.findOne({ email: fields.email })
    // If account not found
    if (user === null) {
      db.close()
      return reportError(
        'Account Email not found.',
        'Account Email not found.',
        'LOGIN_ACCOUNT_NOT_FOUND_ERROR',
        'bf4fe14b-a186-4ab6-98d9-a5435e321854',
      )
    }

    passport = await db.collection('Passport').findOne({ user: user._id })
    res = bcrypt.compareSync(fields.password, passport.password)
    // If res = false then password not valid
    if (res === false) {
      db.close()
      return reportError(
        'Password not valid.',
        'The input password is not the same as the account\'s password',
        'LOGIN_ACCOUNT_PASSWORD_ERROR',
        '5b8b302d-9da7-49ae-8a92-12f34fd658b3',
      )
    }

    db.close();
    return {
      email: user.email,
      firstName: user.firstName,
      surname: user.surname,
      token: user.token,
    }

  } catch (error) {
    if (db) {
      db.close()
    }

    if ('constructor' in error && error.constructor.name == 'TypeError') {
      console.log(error)
      return
    }

    if (db === null || error.constains('connect ECONNREFUSED') ) {
      return reportError(
        'Database connection error.',
        'It was an error in the connection with the database.',
        'DATA_BASE_CONNECTION_ERROR',
        'a7c5bbb7-ee5c-45fe-af13-29e3c2cda683',
      )
    }
  }
}
