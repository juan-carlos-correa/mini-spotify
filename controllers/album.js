'use strcict'

const Album = require('../models/album')

function getAlbum (req, res) {  
  res.status(200).send({ message: 'Album' })
}

module.exports = {
  getAlbum
}
