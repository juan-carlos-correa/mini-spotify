'use strict'

const express = require('express')
const SongController = require('../controllers/song')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')

api.get('/song', mdAuth.ensureAuth, SongController.getSong)

module.exports = api
