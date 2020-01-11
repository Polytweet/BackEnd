const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const determinant = new Schema({
    value : String
});

module.exports = mongoose.model('Determinant', determinant);