'use strict'

const express = require('express')
const ArtistController = require('../controllers/artist')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')
const multipart = require('connect-multiparty')
const mdUpload = multipart({ uploadDir: './uploads/artists' })

api.get('/artist/:id', mdAuth.ensureAuth, ArtistController.getArtist)
api.post('/artist', mdAuth.ensureAuth, ArtistController.saveArtist)
api.get('/artists/:page?', mdAuth.ensureAuth, ArtistController.getArtists)
api.put('/artist/:id', mdAuth.ensureAuth, ArtistController.updateArtist)
api.delete('/artist/:id', mdAuth.ensureAuth, ArtistController.deleteArtist)
api.post('/upload-image-artist/:id', [mdAuth.ensureAuth, mdUpload], ArtistController.uploadImage)
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile)

module.exports = api
