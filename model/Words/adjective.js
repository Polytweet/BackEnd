const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const adjective = new Schema({
    value : String
});

module.exports = mongoose.model('Adjective', adjective);