'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const artistRoutes = require('./routes/artist')
const albumRoutes = require('./routes/album')
const songRoutes = require('./routes/song')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use('/api', userRoutes)
app.use('/api', artistRoutes)
app.use('/api', albumRoutes)
app.use('/api', songRoutes)

module.exports = app
