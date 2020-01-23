const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const verb = new Schema({
    value : String,
    infinitive : String
});

module.exports = mongoose.model('Verb', verb);