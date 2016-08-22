// About token in nodejs
// http://www.kdelemme.com/2014/08/16/token-based-authentication-with-nodejs-redis/
import crypto from 'crypto'

export function createToken(size=16) {
  return new Promise(
    (resolve, reject) => {
      crypto.randomBytes(size, (err, buf) => {
        if (err) {
          reject(err)
        }
        resolve(buf.toString('hex'))
      })
    }
  )
}
