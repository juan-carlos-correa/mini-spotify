'use strcict'

const Song = require('../models/song')

function getSong (req, res) {
  res.status(200).send({ message: 'Ok' })
}

module.exports = {
  getSong
}
