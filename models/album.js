'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlbumSchema = Schema({
  title: String,
  description: String,
  year: Number,
  image: String,
  artist: { type: Schema.ObjectId, ref: 'Artists' }
})

module.exports = mongoose.model('Albums', AlbumSchema)
