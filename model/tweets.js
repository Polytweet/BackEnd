const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweets = new Schema({
    hashtag : [],
    text : String,
    geoTweet : {
        city : String,
        cityCode : Number,
        departmentCode : Number,
        regionCode : Number        
    },
    checked : {
        type : Boolean,
        default : false
    },
    createdat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tweets', tweets);