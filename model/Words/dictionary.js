const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const dictionary = new Schema({
    value : String,
    synonymous : [[String]]
});

module.exports = mongoose.model('Dictionary', dictionary);