'use strcict'

const path = require('path')
const fs = require('fs')
const mongoosePaginate = require('mongoose-pagination')

const Artist = require('../models/artist')
const Album = require('../models/album')
const Song = require('../models/song')

function getArtist (req, res) {
  const artistId = req.params.id
  Artist.findById(artistId, (err, artist) => {
    if (err) return res.status(500).send({ message: `Hubo un error al buscar el artista: ${err}` })
    if (!artist) return res.status(400).send({ message: 'No se encontró el artista :(' })
    res.status(200).send({ message: 'Artista encontrado', artist })
  })
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

function getArtists (req, res) {
  const page = req.params.page || 1
  const itemsPerPage = 3

  Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total) => {
    if (err) return res.status(500).send({ message: `Error en la petición: ${err}` })
    if (!artists) return res.status(500).send({ message: 'Error al mostrar los artistas :(' })
    res.status(200).send({ total, artists })
  })
}

function updateArtist (req, res) {
  const artistId = req.params.id
  const update = req.body

  Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
    if (err) return res.status(500).send({ message: `Hubo un error al actualizar el artista: ${err}` })
    if (!updateArtist) return res.status(400).send({ message: 'No se pudo actualizar el artista' })
    res.status(200).send({ message: 'Artista actualizado', artistUpdated })
  })
}

function deleteArtist (req, res) {
  const artistId = req.params.id

  Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
    if (err) return res.status(500).send({ message: `Hubo un error al eliminar el artista: ${err}` })
    if (!artistRemoved) return res.status(400).send({ message: 'No se pudo elimiar el artista' })
    Album.find({ artist: artistRemoved._id }).remove((err, albumRemoved) => {
      if (err) return res.status(500).send({ message: `Hubo un error al eliminar el album del artista: ${err}` })
      if (!updateArtist) return res.status(400).send({ message: 'No se pudo eliminar el album' })
      Song.find({ album: albumRemoved._id }).remove((err, songRemoved) => {
        if (err) return res.status(500).send({ message: `Hubo un error al eliminar las canciones del artista: ${err}` })
        if (!updateArtist) return res.status(400).send({ message: 'No se pudieron eliminar las canciones del artista' })
        res.status(200).send({
          message: 'Artista y su material asociado eliminados',
          artistRemoved
        })
      })
    })
  })
}

function uploadImage (req, res) {
  const artistId = req.params.id

  if (!req.files) return res.status(300).send({ message: 'No se seleccionó ninguna imagen' })
  const filePath = req.files.image.path.split('\\')
  const fileName = filePath[2]
  const extension = fileName.split('.')

  if (extension[1] !== 'png' && extension[1] !== 'jpg') return res.status(400).send({ message: 'La imagen debe ser png o jpeg' })
  Artist.findByIdAndUpdate(artistId, { image: fileName }, (err, artistUpdated) => {
    if (err) return res.status(500).send({ message: `Error al subir la imagen: ${err}` })
    res.status(200).send({ message: 'Artista actualizado', artistUpdated })
  })
}

function getImageFile (req, res) {
  const imageFile = req.params.imageFile
  const patFile = `./uploads/artists/${imageFile}`
  fs.exists(patFile, (exists) => {
    if (!exists) return res.status(404).send({ message: 'No existe la imagen' })
    res.sendFile(path.resolve(patFile))
  })
}

module.exports = {
  getArtist,
  saveArtist,
  getArtists,
  updateArtist,
  deleteArtist,
  uploadImage,
  getImageFile
}
