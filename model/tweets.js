const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweets = new Schema({
    hashtag : [],
    city : String,
    text : String,
    createdat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tweets', tweets);