'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  name: String,
  surname: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  role: {type: String, enum: ['ROLE_USER', 'ROLE_ADMIN']},
  imagen: String
})

module.exports = mongoose.model('Users', UserSchema)
