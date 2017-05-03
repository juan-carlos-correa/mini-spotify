'use strict'

function prueba (req, res) {
  res.status(200).send({
    message: 'Prueba'
  })
}

module.exports = {
  prueba
}
