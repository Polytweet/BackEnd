var Twit = require('twit');
const https = require('https');
const Tweets = require('./model/tweets.js');
const fs = require('fs');

var T = new Twit({
    consumer_key:         'EpP9GIS78AIRQxy3qX1NpJf4H',
    consumer_secret:      '9828PtJOgdWHpUhmjWJKeg9wWj30FgKqhH94rNWXSEOHPY8Qm7',
    access_token:         '890649688822644736-mT4pn0gjMhIiqPUnPze0PYr8D2yPejX',
    access_token_secret:  'OBhn9LnPIfFYkqcXUZGSX092XzqTOMnFHaIc0Yg48Gp8d',
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
                callApiByCityName(city)
                .then(function (response){
                    if(response){
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
    });
}

async function insertTweets(_hashtag, _text, _geoTweet) {
    let tweets = new Tweets({
        hashtag : _hashtag,
        text : _text,
        geoTweet : {
            city : _geoTweet[0],
            cityCode : Number(_geoTweet[1]),
            departmentCode : Number(_geoTweet[2]),
            regionCode : Number(_geoTweet[3]),
        }
    });
    console.log('\x1b[31m', _hashtag + ' -> ' + _text);
    console.log('\x1b[34m', 'From -> ' + _geoTweet + '\x1b[0m\n');

    await tweets.save();
}

function callApiByCityName(cityName){
    return new Promise(function (resolve, reject){
        let data = '';
        https.get('https://geo.api.gouv.fr/communes?nom=' + cityName + '&limit=1', (resp) => {            
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
    })
}