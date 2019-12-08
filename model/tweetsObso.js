const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetsObso = new Schema({
    hashtag : [],
    text : String,
    geoTweet : {
        city : String,
        cityCode : String,
        departmentCode : String,
        regionCode : String        
    },
    checked : {
        type : Boolean,
        default : false
    },
    createdat: {
        type: Date,
    }
});

module.exports = mongoose.model('ObsoleteTweets', tweetsObso);