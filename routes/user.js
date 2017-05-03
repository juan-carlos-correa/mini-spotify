'use strict'

const express = require('express')
const userController = require('../controllers/user')

const api = express.Router()

api.get('/prueba', userController.prueba)

module.exports = api
