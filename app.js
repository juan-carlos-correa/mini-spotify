'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const artistRoutes = require('./routes/artist')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', userRoutes)
app.use('/api', artistRoutes)

module.exports = app
