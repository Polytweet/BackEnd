const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const englishWord = new Schema({
    value : String
});

module.exports = mongoose.model('EnglishWord', englishWord);