'use strcict'

const path = require('path')
const fs = require('fs')

const Artist = require('../models/artist')
const Album = require('../models/album')
const Song = require('../models/song')

function getArtist (req, res) {
  res.status(200).send({ message: 'Método getArtist' })
}

module.exports = {
  getArtist
}
