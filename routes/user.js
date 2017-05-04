'use strict'

const express = require('express')
const mdAuth = require('../middlewares/authenticated')
const userController = require('../controllers/user')

const api = express.Router()

api.post('/register', userController.saveUser)
api.post('/login', userController.loginUser)
api.post('/prueba', mdAuth.ensureAuth, (req, res) => {
  res.status(200).send({ message: 'Token válido', user: req.user })
})
api.put('/update-user/:id', mdAuth.ensureAuth, userController.updateUser)

module.exports = api
