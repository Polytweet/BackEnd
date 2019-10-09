const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const commune = new Schema({
  fields: {
    nom_dept: String,
    population: Number,
    code_reg: String,
    nom_reg: String,
    geo_point_2d: [Number],
    code_dept: String,
    code_com: String,
    geo_shape: {
        _type: String,
        coordinates: [ [ [ { type: Number } ] ] ]
    },
    code_postal: String,
    superficie: Number,
    nom_com: String
  },
  geometry: {
    _type: String,
    coordinates: [ { type: Number } ]
  }
});

module.exports = mongoose.model('Commune', commune);