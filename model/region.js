const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const region = new Schema({
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

module.exports = mongoose.model('Region', region);