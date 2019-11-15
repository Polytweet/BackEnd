var Twit = require('twit');
const fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const Tweets = require('./model/tweets.js');

var T = new Twit({
    consumer_key:         'GHQFHxOVTxWPdQKZTnbn4eeUo',
    consumer_secret:      '80imXfoVwDFkwRDBJBp1QoclJ9RhPOIY4FyKotRa4kHUES8AMe',
    access_token:         '890649688822644736-s88fmMgiNd94AFFqVyPYK3o7TkNUwcw',
    access_token_secret:  'H04VuFTFkL2nJyAlEPcGElwNupMCsqt8yIKGysfbCZyy2',
  });

module.exports = async function StartTweetSteam(boundingBox){
    var stream = T.stream('statuses/filter', { locations: boundingBox } );
    stream.on('tweet', function (tweet) {
        var city = tweet['place']['name'];
        var text = tweet['text'];
        var hashtagTab = [];

        for (var i=0;i<tweet['entities']['hashtags'].length;i++) {
            hashtagTab[i] = tweet['entities']['hashtags'][i]['text'];
        }

        if(hashtagTab.length > 0){
            insertTweets(hashtagTab, city, text);
        }
    });
}

async function insertTweets(_hashtag, _city, _text) {
    let tweets = new Tweets({
        hashtag : _hashtag,
        city : _city,
        text : _text,
    });
    console.log(_hashtag + ' -> ' + _city + ' ----> ' + _text);
    await tweets.save();
}