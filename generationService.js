const mongoose = require('mongoose');
const fs = require('fs');
const schedule = require('node-schedule');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  startGenration();
}).catch(err => {
  console.log(err);
});

function startGenration(){
  console.log("Genaration started");

  const tweets = require('./tweets.js');
  const JSONtweets = JSON.parse(fs.readFileSync('tweetTemplates.json'))

  //Toute les 2s
  schedule.scheduleJob('*/2 * * * * *', function(){
    tweets.InsertTweet(JSONtweets[getRandomInt(JSONtweets.length)]);
    //insertNews();
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


async function insertNews()
{
  console.log("News inserted");
}

