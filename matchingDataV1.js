const https = require('https');
var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const News = require('./model/news');
const Tweet = require('./model/tweets');
const MatchingTN = require('./model/matchingTN');

module.exports = async function matchingDataV1() {
  let dictionnary = await db.Dictionary.find({});
  console.log(dictionnary);
    // console.log(NewsInDB);
    // let TweetsInDB = await Tweet.find({ checked: false });
    // let resultsTab = new Array();
    // //console.log(NewsInDB);
    // // console.log(TweetsInDB);
    // TweetsInDB.forEach(function(tweetATraiter)
    // {
    //     NewsInDB.forEach(function(newsATester)
    //     {
    //         console.log(resultsTab[newsATester]);
    //     });
        
    // });

    // console.log(resultsTab);



let content = "";
// resultsTab[newsATester] = new Array();
//appel à l'API
// token 024c6514c6e44818a00f49c6f17b2cc8
//let requete = "https://api.dandelion.eu/datatxt/sim/v1/?text1=comment&text2=All%20nominees%20for%20the%20Academy%20Awards&token=024c6514c6e44818a00f49c6f17b2cc8";
let requete = "https://api.dandelion.eu/datatxt/sim/v1/?text1=Cameron%20wins%20the%20Oscar&text2=All%20nominees%20for%20the%20Academy%20Awards&token=024c6514c6e44818a00f49c6f17b2cc8";


https.get(requete, (resp) => {

    resp.on('data', (chunk) => {
      content += chunk;
    });
    resp.on('end', () => {
    //   resultsTab[newsATester] = content;
    console.log(content);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });


console.log(content);

}