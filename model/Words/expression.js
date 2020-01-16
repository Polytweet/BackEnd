const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const expression = new Schema({
    value : String
});

module.exports = mongoose.model('Expression', expression );