'use strict'

const express = require('express')
const SongController = require('../controllers/song')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')
const multipart = require('connect-multiparty')
const mdUpload = multipart({ uploadDir: './uploads/songs' })

api.get('/song/:id', mdAuth.ensureAuth, SongController.getSong)
api.get('/songs/:id?', mdAuth.ensureAuth, SongController.getSongs)
api.post('/song', mdAuth.ensureAuth, SongController.saveSong)
api.put('/song/:id', mdAuth.ensureAuth, SongController.updateSong)
api.delete('/song/:id', mdAuth.ensureAuth, SongController.removeSong)
api.post('/upload-song/:id', [mdAuth.ensureAuth, mdUpload], SongController.uploadSong)
api.get('/get-song/:songFile', SongController.getSongFile)

module.exports = api
