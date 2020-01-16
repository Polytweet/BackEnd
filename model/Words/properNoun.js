const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const properNoun = new Schema({
    value : String
});

module.exports = mongoose.model('ProperNoun', properNoun);