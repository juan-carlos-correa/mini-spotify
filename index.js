'use strict'

const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')

mongoose.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db_name}`, (err, res) => {
  if (err) throw err
  console.log(`DB en puerto ${config.db_port}`)
  app.listen(config.server_port, (err) => {
    if (err) throw err
    console.log(`server en puerto ${config.server_port}`)
  })
})
