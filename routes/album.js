'use strict'

const express = require('express')
const AlbumController = require('../controllers/album')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')

api.get('/album', mdAuth.ensureAuth, AlbumController.getAlbum)

module.exports = api
