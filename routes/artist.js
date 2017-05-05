'use strict'

const express = require('express')
const ArtistController = require('../controllers/artist')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')

api.get('/artist', mdAuth.ensureAuth, ArtistController.getArtist)

module.exports = api
