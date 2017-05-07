'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = Schema({
  number: Number,
  name: String,
  duration: String,
  file: String,
  album: { type: Schema.ObjectId, ref: 'Albums' }
})

module.exports = mongoose.model('Songs', SongSchema)
