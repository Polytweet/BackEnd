const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweets = new Schema({
    hashtag : [String],
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
        default: Date.now
    },
    newsAboutIt: [String]
});

module.exports = mongoose.model('Tweets', tweets);