const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const adverb = new Schema({
    value : String
});

module.exports = mongoose.model('Adverb', adverb);