const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweets = new Schema({
    hashtag : String,
    city : String,
    createdat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tweets', tweets);