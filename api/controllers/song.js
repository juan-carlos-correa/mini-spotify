'use strcict'

const Song = require('../models/song')
const path = require('path')
const fs = require('fs')

function getSong (req, res) {
  const songId = req.params.id
  if (!songId) return res.status(500).send({ message: 'No se recibió el id' })
  Song.findById(songId).populate({ path: 'album' }).exec((err, song) => {
    if (err) return res.status(400).send({ message: `Error: ${err}` })
    if (!song) return res.status(404).send({ message: 'La canción no existe' })
    res.status(200).send({ message: 'Canción encontrada', song })
  })
}

function getSongs (req, res) {
  const albumId = req.params.album
  const find = !albumId
  ? Song.find().sort('number')
  : Song.find({album: albumId}).sort('number')
  find.populate({
    path: 'album',
    populate: {
      path: 'artist',
      model: 'Artists'
    }
  }).exec((err, songs) => {
    if (err) return res.status(500).send({ message: `Hubo un error: ${err}` })
    if (!songs) return res.status(400).send({ message: 'No hay canciones' })
    res.status(200).send({ message: 'Canciones obtenidas', songs })
  })
}

function saveSong (req, res) {
  let song = new Song()

  const params = req.body
  song.name = params.name
  song.duration = params.duration
  song.album = params.album
  song.number = 1

  song.save((err, songStored) => {
    if (err) return res.status(500).send({ message: `Error al guardar la canción: ${err}` })
    if (!songStored) return res.status(400).send({ message: 'Error al guardar la canción' })
    res.status(200).send({ message: 'Canción guardada', songStored })
  })
}

function updateSong (req, res) {
  const songId = req.params.id
  if (!songId) return res.status(500).send({ message: 'No se recibió el id' })
  const update = req.body
  Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` })
    if (!songUpdated) return res.status(400).send({ message: 'No se actualizó la canción' })
    res.status(200).send({ message: 'Canción actualizada', songUpdated })
  })
}

function removeSong (req, res) {
  const songId = req.params.id
  if (!songId) return res.status(500).send({ message: 'No se recibió el id' })
  Song.findByIdAndRemove(songId, (err, songRemoved) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` })
    if (!songRemoved) return res.status(400).send({ message: 'No se borró la canción' })
    res.status(200).send({ message: 'Canción borrada', songRemoved })
  })
}

function uploadSong (req, res) {
  const songId = req.params.id
  if (!songId) return res.status(500).send({ message: 'No se recibió el id' })
  if (!req.files) return res.status(300).send({ message: 'No se seleccionó ningún archivo' })
  const filePath = req.files.file.path.split('\\')
  const fileName = filePath[2]
  const extension = fileName.split('.')

  if (extension[1] !== 'mp3' && extension[1] !== 'ogg') return res.status(400).send({ message: 'El archivo debe ser mp3 u ogg' })
  Song.findByIdAndUpdate(songId, { file: fileName }, (err, songUpdated) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` })
    res.status(200).send({ message: 'Canción actualizada', songUpdated })
  })
}

function getSongFile (req, res) {
  const songFile = req.params.songFile
  const pathFile = `./uploads/songs/${songFile}`
  fs.exists(pathFile, (exists) => {
    if (!exists) return res.status(404).send({ message: 'No se encontró la canción' })
    res.sendFile(path.resolve(pathFile))
  })
}

module.exports = {
  getSong,
  saveSong,
  getSongs,
  updateSong,
  removeSong,
  uploadSong,
  getSongFile
}
