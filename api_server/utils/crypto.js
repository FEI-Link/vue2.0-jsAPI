const crypto = require('crypto')

exports.stringToHash = (str) => {
  const hash = crypto.createHash('md5')
  
  return hash.update(str).digest('hex')
}