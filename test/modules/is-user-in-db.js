import {MongoClient} from 'mongodb'
import {mongodbConf} from '../../src/config'
import {reportError} from '../../src/modules/log/error'

export async function isUserInDB(fields) {
  let db = null,
      res = null,
      UserID = null,
      result = null;

  try {
    db = await MongoClient.connect(mongodbConf.url)
    // Check the user/email is not taken
    res = await db.collection('User').findOne({ email: fields.email })

    db.close()

    if (res !== null) {
      return res
      // result = reportError(
      //   'Email already used.',
      //   'The email is already used.',
      //   'REGISTER_EMAIL_ALREADY_TAKEN_ERROR',
      //   '4428b93b-3934-4137-aee1-5575c3e98360',
      // )
    }
    return false
  } catch (error) {
    if (db) {
      db.close()
    }

    if (
      db === null ||
      (
        typeof error === 'string' &&
        error.constains('connect ECONNREFUSED')
      )
    ) {
      result = reportError(
        'Database connection error.',
        'It was an error in the connection with the database.',
        'DATA_BASE_CONNECTION_ERROR',
        'a7c5bbb7-ee5c-45fe-af13-29e3c2cda683',
      )
    }
    return error
  }

  return result
}
