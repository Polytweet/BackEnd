var Twit = require('twit');
const fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const Tweets = require('./model/tweets.js');

var T = new Twit({
    consumer_key:         'dwlUZf2SWjPCWQWcXSgHZOjSY',
    consumer_secret:      'OclSCee156QNha7xIWbKOh1yJKS6DmE5B2Ypf8W6dONJ3TV8Pt',
    access_token:         '890649688822644736-s88fmMgiNd94AFFqVyPYK3o7TkNUwcw',
    access_token_secret:  'H04VuFTFkL2nJyAlEPcGElwNupMCsqt8yIKGysfbCZyy2',
  });

module.exports = async function StartTweetSteam(boundingBox){
    var stream = T.stream('statuses/filter', { locations: boundingBox } );
    stream.on('tweet', function (tweet) {
        for (var i=0;i<tweet['entities']['hashtags'].length;i++) {
            let hashtag = tweet['entities']['hashtags'][i]['text'];
            let city = tweet['place']['name'];
            //console.log(hashtag + ' -> ' + city);
            insertTweets(hashtag, city);
        }
    });
}

async function insertTweets(_hashtag, _city) {
    let tweets = new Tweets({
        hashtag : _hashtag,
        city : _city,
    });
    console.log(_hashtag + ' -> ' + _city);
    await tweets.save();
}