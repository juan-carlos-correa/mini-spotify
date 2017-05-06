'use strcict'

const fs = require('fs')
const path = require('path')
const Album = require('../models/album')
const Song = require('../models/song')

function getAlbum (req, res) {
  const albumId = req.params.id
  Album.findById(albumId)
  .populate({path: 'artist'})
  .exec((err, album) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` })
    if (!album) return res.status(404).send({ message: 'No se encontró el album' })
    res.status(200).send({ message: 'Album encontrado', album })
  })
}

function getAlbums (req, res) {
  const artistId = req.params.id

  const find = !artistId
  ? Album.find().sort('title')
  : Album.find({artist: artistId}).sort('year')

  find.populate({path: 'artist'}).exec((err, albums) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` })
    if (!albums) return res.status(400).send({ message: 'No hay albums :(' })
    res.status(200).send({ message: 'Albums', albums })
  })
}

function saveAlbum (req, res) {
  let album = new Album()
  const params = req.body

  album.title = params.title
  album.description = params.description
  album.year = params.year
  album.image = ''
  album.artist = params.artist

  album.save((err, albumStored) => {
    if (err) return res.status(500).send({ message: `Hubo un error al guardar el album: ${err}` })
    if (!albumStored) return res.status(500).send({ message: 'Error al guardar' })
    res.status(200).send({ message: 'Album guardado', albumStored })
  })
}

function updateAlbum (req, res) {
  const albumId = req.params.id
  const update = req.body
  Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
    if (err) return res.status(500).send({ message: `Hubo un error al actualizar el album: ${err}` })
    if (!albumUpdated) return res.status(400).send({ message: 'No se pudo actualizar el album' })
    res.status(200).send({ message: 'Album actualizado', albumUpdated })
  })
}

function deleteAlbum (req, res) {
  const albumId = req.params.id
  if (!albumId) return res.status(500).send({ message: 'No se recibió el id' })
  Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
    if (err) return res.status(500).send({ message: `Hubo un error al borrar el album: ${err}` })
    if (!albumRemoved) return res.status(400).send({ message: 'No se pudo borrar el album' })
    Song.find({ album: albumRemoved._id }).remove((err, songRemoved) => {
      if (err) return res.status(500).send({ message: `Hubo un error al borrar las canciones del album: ${err}` })
      if (!songRemoved) return res.status(400).send({ message: 'No hay canciones del album para borrar' })
      res.status(200).send({ message: 'Album borrado', albumRemoved })
    })
  })
}

function uploadImage (req, res) {
  const albumId = req.params.id

  if (!req.files) return res.status(300).send({ message: 'No se seleccionó ninguna imagen' })
  const filePath = req.files.image.path.split('\\')
  const fileName = filePath[2]
  const extension = fileName.split('.')

  if (extension[1] !== 'png' && extension[1] !== 'jpg') return res.status(400).send({ message: 'La imagen debe ser png o jpeg' })
  Album.findByIdAndUpdate(albumId, { image: fileName }, (err, albumUpdated) => {
    if (err) return res.status(500).send({ message: `Error al subir la imagen: ${err}` })
    if (!albumUpdated) return res.status(400).send({ message: 'No se encontró el album' })
    res.status(200).send({ message: 'Album actualizado', albumUpdated })
  })
}

function getImageFile (req, res) {
  const imageFile = req.params.imageFile
  const patFile = `./uploads/albums/${imageFile}`
  fs.exists(patFile, (exists) => {
    if (!exists) return res.status(404).send({ message: 'No existe la imagen' })
    res.sendFile(path.resolve(patFile))
  })
}

module.exports = {
  getAlbum,
  saveAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageFile
}
