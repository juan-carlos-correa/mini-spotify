'use strict'

const express = require('express')
const userController = require('../controllers/user')

const api = express.Router()

api.post('/register', userController.saveUser)
api.post('/login', userController.loginUser)

module.exports = api
