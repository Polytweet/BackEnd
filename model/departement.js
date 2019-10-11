const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const departement = new Schema({
    _type: String,
    properties: {
        code: String,
        nom: String
    },
    geometry: {
    _type: String,
    coordinates: [ [ [ { type: Number } ] ] ],
    coordinatesMulti: [ [ [ [ { type: Number } ] ] ] ]
    }
});

module.exports = mongoose.model('Departement', departement);