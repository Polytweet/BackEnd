var Twit = require('twit');
const https = require('https');
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
                // callApiByCityName(city).then(function(resolve){
                //     console.log(resolve);
                // })
                // .catch(reject);  
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

function callApiByCityName(cityName){
    return new Promise(function (resolve, reject) {
        https.get('https://geo.api.gouv.fr/communes?nom=' + cityName + '&fields=departement&boost=population&limit=5', (resp) => {
        let data = '';
        
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            resolve(data);
        });
        
        }).on("error", (err) => {
            console.log("Error API: " + err.message);
            reject(err);
        });
    });
}