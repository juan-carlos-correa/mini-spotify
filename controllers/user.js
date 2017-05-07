'use strict'

const fs = require('fs')
const path = require('path')
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
  user.role = 'ROLE_ADMIN'
  user.image = 'null'
  bcrypt.hash(params.password, null, null, (err, hash) => {
    if (err) return new Error(`Error al encriptar password: ${err}`)
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
    if (err) return res.status(500).send({ message: `Error en la petición: ${err}` })
    if (!user) return res.status(404).send({ message: 'El usuario no existe' })

    bcrypt.compare(password, user.password, (err, check) => {
      if (err) return res.status(500).send({ message: `Error al logearse: ${err}` })
      if (!check) return res.status(404).send({ message: 'La contraseña es incorrecta' })
      return res.status(200).send({ message: 'Bienvenido', token: jwt.createToken(user) })
    })
  })
}

function updateUser (req, res) {
  const userId = req.params.id
  const update = req.body

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) return res.status(500).send({ message: `Error al actualizar el usuario: ${err}` })
    if (!userUpdated) return res.status(400).send({ message: 'No pudo actualizarse el usuario' })
    res.status(200).send({ message: 'Usuario actualizado', userUpdated })
  })
}

function uploadImage (req, res) {
  const userId = req.params.id
  if (!req.files) return res.status(300).send({ message: 'No se seleccionó ninguna imagen' })
  const filePath = req.files.image.path.split('\\')
  const fileName = filePath[2]
  const extension = fileName.split('.')

  if (extension[1] !== 'png' && extension[1] !== 'jpg') return res.status(400).send({ message: 'La imagen debe ser png o jpeg' })
  User.findByIdAndUpdate(userId, { imagen: fileName }, (err, userUpdated) => {
    if (err) return res.status(500).send({ message: `Error al subir el avatar: ${err}` })
    res.status(200).send({ message: 'Avatar actualizado', fileName, userUpdated })
  })
}

function getImageFile (req, res) {
  const imageFile = req.params.imageFile
  const patFile = `./uploads/users/${imageFile}`
  fs.exists(patFile, (exists) => {
    if (!exists) return res.status(404).send({ message: 'No existe la imagen' })
    res.sendFile(path.resolve(patFile))
  })
}

module.exports = {
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
}
