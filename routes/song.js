'use strict'

const express = require('express')
const SongController = require('../controllers/song')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')

api.get('/song/:id', mdAuth.ensureAuth, SongController.getSong)
api.post('/song', mdAuth.ensureAuth, SongController.saveSong)

module.exports = api
