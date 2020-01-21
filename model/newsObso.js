const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsObso = new Schema({
    source : String,
    author : String,
    title: String,
    description: String,
    url: String,
    date: Date,
    content: String,
    tweetsAboutIt: [String]
});

module.exports = mongoose.model('ObsoleteNews', newsObso);