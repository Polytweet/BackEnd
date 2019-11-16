var Twit = require('twit');
const fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const Tweets = require('./model/tweets.js');

var T = new Twit({
    consumer_key:         'aX2X2z4x4FVXhZKFEwGD7FGaT',
    consumer_secret:      'rMXskHXkkRlf5ozk70whkYCxf6jA8M1gN0Ntugcyy9QAh4riDy',
    access_token:         '890649688822644736-az44QIQKokKurIiJkvA0n6QQBxhr66s',
    access_token_secret:  'T4lvTY54aYI4vPlXuaLbyYMjgHHzdKOxJdFJ08paTy9XS',
  });

module.exports = async function StartTweetSteam(boundingBox){
    var stream = T.stream('statuses/filter', { locations: boundingBox } );
    stream.on('tweet', function (tweet) {
        try {
            var city = tweet['place']['name'];
            var text = tweet['text'];
            var hashtagTab = [];
    
            for (var i=0;i<tweet['entities']['hashtags'].length;i++) {
                hashtagTab[i] = tweet['entities']['hashtags'][i]['text'];
            }
    
            if(hashtagTab.length > 0){
                insertTweets(hashtagTab, city, text);
            }   
        } catch (error) {
            console.log(error);
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