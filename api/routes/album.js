'use strict'

const express = require('express')
const AlbumController = require('../controllers/album')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')
const multipart = require('connect-multiparty')
const mdUpload = multipart({ uploadDir: './uploads/albums' })

api.get('/album/:id', mdAuth.ensureAuth, AlbumController.getAlbum)
api.post('/album', mdAuth.ensureAuth, AlbumController.saveAlbum)
api.get('/albums/:artist?', mdAuth.ensureAuth, AlbumController.getAlbums)
api.put('/album/:id', mdAuth.ensureAuth, AlbumController.updateAlbum)
api.delete('/album/:id', mdAuth.ensureAuth, AlbumController.deleteAlbum)
api.post('/upload-image-album/:id', [mdAuth.ensureAuth, mdUpload], AlbumController.uploadImage)
api.get('/get-image-album/:imageFile', AlbumController.getImageFile)

module.exports = api
