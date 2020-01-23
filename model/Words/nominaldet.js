const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const nominaldet = new Schema({
    value : String
});

module.exports = mongoose.model('Nominaldel', nominaldet );