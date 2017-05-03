'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secretKey = process.env.KEY || 'xL8YlMoU6sv/E69.3iKDX1J1vlQhUx'

exports.createToken = (user) => {
  let payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    expiration: moment().add(30, 'days').unix
  }

  return jwt.encode(payload, secretKey)
}
