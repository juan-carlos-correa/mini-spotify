'use strict'

const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const jwt = require('../services/jwt')

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
      res.status(200).send({ message: 'ok', userStored })
    })
  })
}

function loginUser (req, res) {
  const params = req.body

  let email = params.email.toLowerCase()
  let password = params.password
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ message: 'Error en la petición' })
    if (!user) return res.status(404).send({ message: 'El usuario no existe' })

    bcrypt.compare(password, user.password, (err, check) => {
      if (err) return res.status(500).send({ message: 'Error al logearse' })
      if (!check) return res.status(404).send({ message: 'La contraseña es incorrecta' })
      return res.status(200).send({ message: 'Bienvenido', token: jwt.createToken(user) })
    })
  })
}

module.exports = {
  saveUser,
  loginUser
}
