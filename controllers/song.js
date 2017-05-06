'use strcict'

const Song = require('../models/song')

function getSong (req, res) {
  res.status(200).send({ message: 'Ok' })
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
