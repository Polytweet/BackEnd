const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const noun = new Schema({
    value : String
});

module.exports = mongoose.model('Noun', noun);