'use strict'

const express = require('express')
const AlbumController = require('../controllers/album')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')

api.get('/album/:id', mdAuth.ensureAuth, AlbumController.getAlbum)
api.post('/album', mdAuth.ensureAuth, AlbumController.saveAlbum)

module.exports = api
