'use strict'

const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db_name}`, (err, res) => {
  if (err) throw err
  console.log(`DB en puerto ${config.db_port}`)
})
