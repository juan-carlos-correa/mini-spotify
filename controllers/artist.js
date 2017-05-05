'use strcict'

const path = require('path')
const fs = require('fs')

const Artist = require('../models/artist')
const Album = require('../models/album')
const Song = require('../models/song')

function getArtist (req, res) {
  res.status(200).send({ message: 'Método getArtist' })
}

function saveArtist (req, res) {
  const artist = new Artist()

  const params = req.body
  artist.name = params.name
  artist.description = params.description
  artist.image = null

  artist.save((err, artistStored) => {
    if (err) return res.status(500).send({ message: `Error al guardar el artista: ${err}` })
    if (!artistStored) return res.status(400).send({ message: 'No se guardó el artista' })
    res.status(200).send({ message: 'Artista guardado', artistStored })
  })
}

module.exports = {
  getArtist,
  saveArtist
}
