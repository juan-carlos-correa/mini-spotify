'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  role: String,
  imagen: String
})

module.exports = mongoose.model('Users', UserSchema)
