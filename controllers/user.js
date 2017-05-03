'use strict'

const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')

function saveUser (req, res) {
  const user = new User()
  const params = req.body

  if (!params.password || !params.name || !params.surname || !params.email) {
    return res.status(500).send({message: 'Debes enviar todos los datos'})
  }

  user.name = params.name
  user.surname = params.surname
  user.email = params.email
  user.role = 'ROLE_USER'
  user.image = 'null'
  bcrypt.hash(params.password, null, null, (err, hash) => {
    if (err) return new Error('Error al encriptar password')
    user.password = hash
    user.save((err, userStored) => {
      if (err) res.status(400).send({ message: 'error', err })
      res.status(200).send({ message: 'ok', data: userStored })
    })
  })
}

module.exports = {
  saveUser
}
