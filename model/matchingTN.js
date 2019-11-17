const mongoose = require('mongoose');
const News = require('./news');
const Tweet = require('./tweets');
const fs = require('fs');
const Schema = mongoose.Schema;


const matchingTN = new Schema({
    _id : String,
    news : News,
    tweet : Tweet,
    percentage : Number
});

module.exports = mongoose.model('MatchingTN', matchingTN);
