const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const prefix = new Schema({
    value : String
});

module.exports = mongoose.model('Prefix', prefix);