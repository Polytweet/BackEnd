const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const pronoun = new Schema({
    value : String
});

module.exports = mongoose.model('Pronoun', pronoun);