const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const news = new Schema({
    source : String,
    author : String,
    title: String,
    description: String,
    url: String,
    date: Date,
    content: String,
    tweetsAboutIt: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('News', news);

