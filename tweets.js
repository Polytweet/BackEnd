var Twit = require('twit');
const https = require('https');
const Tweets = require('./model/tweets.js');

var T = new Twit({
    consumer_key:         'D8xZV18oVSgrnP0gwcoBh7Kh4',
    consumer_secret:      'KaSRPiyMlpwrM4jv4mpMZF6ricV5K3a9WxUi78jrAah2FczOjc',
    access_token:         '890649688822644736-yqNjJl2pNdsYI9Juhbtwmcgu8ZINPsN',
    access_token_secret:  'eOM5zkghXueuDjwaHd6kjxcRb0DdS6rjV6HsG1PCvJltU',
  });

module.exports = {
    StartTweetStream: async function(boundingBox){
        console.log("Tweet stream initialisation...");
        var stream = T.stream('statuses/filter', { locations: boundingBox } );
        console.log("Tweet stream started");
    
        stream.on('tweet', function (tweet) {
           onTweetReceived(tweet);
        });
    },
    InsertTweet: function(tweet){
        onTweetReceived(tweet);
    }
};

async function onTweetReceived(tweet)
{
    try {
        var city = tweet['place']['name'];
        var text = tweet['text'];
        var hashtagTab = [];

        for (var i=0;i<tweet['entities']['hashtags'].length;i++) {
            hashtagTab[i] = tweet['entities']['hashtags'][i]['text'];
        }

        if(hashtagTab.length > 0){
            callApiByCityName(city)
            .then(function (response){
                if(response) {
                    insertTweets(hashtagTab, text, response);
                }
            })
            .catch(function (req){
                console.log(req);
            })
        }   
    } catch (error) {
        console.log(error);
    }
}

function callApiByCityName(cityName){
    return new Promise(function (resolve, reject){
        let data = '';
        https.get('https://geo.api.gouv.fr/communes?nom=' + cityName + '&boost=population&limit=1', (resp) => {            
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                let dataParsed = JSON.parse(data);
                if(dataParsed.length > 0){
                    try {
                        let cityInfo = [];
                        cityInfo[0] = dataParsed[0]['nom'];
                        cityInfo[1] = dataParsed[0]['code'];
                        cityInfo[2] = dataParsed[0]['codeDepartement'];
                        cityInfo[3] = dataParsed[0]['codeRegion'];
                        resolve(cityInfo);
                    } catch (error) {
                        reject(error);   
                    }
                }
                else{
                    resolve(null);
                }
            });
            }).on("error", (error) => {
                reject(error);
        });
    });
}

function insertTweets(_hashtag, _text, _geoTweet) {
    var newsAboutItEmpty = [];
    let tweets = new Tweets({
        hashtag : _hashtag,
        text : _text,
        geoTweet : {
            city : _geoTweet[0],
            cityCode : _geoTweet[1],
            departmentCode : _geoTweet[2],
            regionCode : _geoTweet[3],
            newsAboutIt: newsAboutItEmpty
        }
    });

    console.log('\x1b[31m', _hashtag + ' -> ' + _text);
    console.log('\x1b[34m', 'From -> ' + _geoTweet + '\x1b[0m\n');

    tweets.save();
}