const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const preposition = new Schema({
    value : String
});

module.exports = mongoose.model('Preposition', preposition);