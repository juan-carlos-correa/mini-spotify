'use strict'

const express = require('express')
const ArtistController = require('../controllers/artist')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')

api.get('/artist/:id', mdAuth.ensureAuth, ArtistController.getArtist)
api.post('/artist', mdAuth.ensureAuth, ArtistController.saveArtist)
api.get('/artists/:page?', mdAuth.ensureAuth, ArtistController.getArtists)
api.put('/artist/:id', mdAuth.ensureAuth, ArtistController.updateArtist)
api.delete('/artist/:id', mdAuth.ensureAuth, ArtistController.deleteArtist)

module.exports = api
