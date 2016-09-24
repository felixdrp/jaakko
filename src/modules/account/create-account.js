import deepmerge from 'deepmerge'
import field from '../check-field'
import {reportError} from '../log/error'
import { MongoClient, ObjectID } from 'mongodb'
import { mongodbConf, fieldsOptions } from '../../config'
import { createToken } from '../token-generator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'


export async function createAccount(input, options) {
  // input fields
  if (!input || typeof input !== 'object' ) {
    return reportError(
      'Register input type not valid',
      'Input fields is not an object type.',
      'RINV',
      '30db4b60-fe9e-4c97-87fd-3149c26fe560',
    )
  }
  console.log(Object.keys(input))
  console.log(JSON.stringify(input))

  let error = {};

  let fields = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    reEnterPassword: '',
    ...input,
  }

  let newfieldsOptions

  if (options && typeof options === 'object' ) {
    newfieldsOptions = deepmerge( fieldsOptions, options )
  } else {
    newfieldsOptions = {...fieldsOptions}
  }

  // Check fields
  error = field.checkAll(fields, newfieldsOptions)

  if (error !== null) {
    return error
  }

  // Check password and reEnterPassword are equal
  if (fields.password !== fields.reEnterPassword) {
    return reportError(
      'Register input fields password and re enter password are not equal.',
      'Fields password and re enter password are not equal',
      'RIFPREPNEQUAL',
      '9bcde4cf-9d1f-4b68-8f6f-00e7a3ac965f',
    )
  }

  let db = null,
      colUser = null,
      res  = null,
      token = null,
      newUserID = null;

  try {
    db = await MongoClient.connect(mongodbConf.url)
    // Check the user/email is not taken
    colUser = db.collection('User')
    res = await colUser.findOne({ email: fields.email })

    if (res !== null) {
      db.close()
      return reportError(
        'Email already used.',
        'The email is already used.',
        'REGISTER_EMAIL_ALREADY_TAKEN_ERROR',
        '4428b93b-3934-4137-aee1-5575c3e98360',
      )
    }
    // Create an mondoDB ObjectID for the new user
    newUserID = new ObjectID()
    // Pass the token provided or create a new token
    // debugger

    token = fields.token || await createToken()

    // Add user to collection db.User
    res = await db.collection('User').insertOne({
      _id: newUserID,
      firstName: fields.firstName,
      surname: fields.surname,
      email: fields.email,
      // uploadAsPrivate: true,
      token,
      // tokenupdate: new Date(),
      // question: ''
    })

    // Add user to collection db.Passport
    res = await db.collection('Passport').insertOne({
      user: newUserID,
      password: bcrypt.hashSync(fields.password),
      hash:
        fields.hash ||
        crypto
          .createHash('sha512')
          .update(fields.email + fields.password)
          .digest('base64'),
      provider: 'local',
      identifier: '',
      // Hardcoding for oauth2
      accessToken: '',
      refreshToken: '',
      answer: ''
    })

    // res = await colUser.findOne({ email: fields.email })
    // console.log('Response >>>>>>> ' + res )

  } catch (error) {
    if (db) {
      db.close()
    }

    if (db === null || error.constains('connect ECONNREFUSED') ) {
      return reportError(
        'Database connection error.',
        'It was an error in the connection with the database.',
        'DATA_BASE_CONNECTION_ERROR',
        'a7c5bbb7-ee5c-45fe-af13-29e3c2cda683',
      )
    }
    // throw error
  }

  // // console.log('>>>>>>> ' + JSON.stringify(fieldsOptions,null,2) )
  // // console.log('>>>>>>> ' + JSON.stringify(options,null,2) )
  // console.log('Fields >>>>>>> ' + JSON.stringify(fields) )
  // console.log('OPTIONS >>>>>>> ' + JSON.stringify(fieldsOptions) )
  db.close();
  return token
}
