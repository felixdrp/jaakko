import { reportError } from '../log/error'
import { MongoClient } from 'mongodb'
import { mongodbConf } from '../../config'

export async function deleteAccount(fields) {
  let db = null,
      res = null,
      UserID = null,
      result = null;

  try {
    db = await MongoClient.connect(mongodbConf.url)
    // Check the user/email is not taken
    res = await db.collection('User').findOne({ email: fields.email })

    if (res === null) {
      result = reportError(
        'User not created.',
        'It was an error registering user.',
        'ACCOUNT_REGISTER_ERROR',
        '719b4603-4796-4f2d-b452-20aaafdcfb46',
      )
      return result
    }

    res = await db.collection('Passport').deleteOne({user: res._id})
    result = await db.collection('User').deleteOne({email: fields.email})

    db.close()
    if (res.result.ok & result.result.ok) {
      return true
    }

  } catch (error) {
    if (db) {
      db.close()
    }
    // console.log('>>xxx>>' + Object.keys(error))
    if (db === null || error.constains('connect ECONNREFUSED') ) {
      result = reportError(
        'Database connection error.',
        'It was an error in the connection with the database.',
        'DATA_BASE_CONNECTION_ERROR',
        'a7c5bbb7-ee5c-45fe-af13-29e3c2cda683',
      )
    }
  }
}
