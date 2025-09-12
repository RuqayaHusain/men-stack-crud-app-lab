const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
  name: String,
  description: String,
  numberOfMoons: Number,
  hasRings: Boolean,
})

const Planet = mongoose.model('Planet', planetSchema)

module.exports = Planet
