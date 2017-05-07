'use strcict'

const Song = require('../models/song')

function getSong (req, res) {
  const songId = req.params.id
  if (!songId) return res.status(500).send({ message: 'No se recibió el id' })
  Song.findById(songId).populate({ path: 'album' }).exec((err, song) => {
    if (err) return res.status(400).send({ message: `Error: ${err}` })
    if (!song) return res.status(404).send({ message: 'La canción no existe' })
    res.status(200).send({ message: 'Canción encontrada', song })
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

module.exports = {
  getSong,
  saveSong
}
