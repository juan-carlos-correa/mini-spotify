'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secretKey = process.env.KEY || 'xL8YlMoU6sv/E69.3iKDX1J1vlQhUx'

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).send({ message: 'No se recibió el token' })

  let token = req.headers.authorization
  let payload = {}
  try {
    payload = jwt.decode(token, secretKey)
    if (payload.expiration <= moment.unix()) return res.status(401).send({ message: 'Token expirado' })
  } catch (e) {
    console.log(e)
    return res.status(404).send({ message: 'Token no válido' })
  }

  req.user = payload
  next()
}
