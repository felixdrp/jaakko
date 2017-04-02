import {MongoClient} from 'mongodb'
const DB_CONFIG = {
  url: 'mongodb://localhost:27017/thegither-es',
}

export default class Vcdb {
  constructor() {
    (async () => {
      this.db = await MongoClient.connect(DB_CONFIG.url)
      // console.log(this.db)
    })()
  }

  getSignupInvitations = (fields) => this.db.collection('email')
    .find({
      email: fields.email,
      'content.invite_url': { $exists: true }
    })
    .sort([['createdAt', -1]])
    .toArray()

  getUser = (fields) => this.db.collection('user')
    .findOne({ email: fields.email })

  deleteUser = (fields) => {
    this.db.collection('user')
      .remove({ email: fields.email })
    return this.db.collection('email')
      .remove({ email: fields.email })

  }
}
