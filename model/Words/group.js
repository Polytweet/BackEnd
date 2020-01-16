const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const group = new Schema({
    value : String
});

module.exports = mongoose.model('Group', group);