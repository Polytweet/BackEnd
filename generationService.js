const mongoose = require('mongoose');
const fs = require('fs');
const schedule = require('node-schedule');
const News = require('./model/news');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  startGenration();
}).catch(err => {
  console.log(err);
});

function startGenration(){
  console.log("Genaration started");

  const tweets = require('./tweets.js');
  const JSONtweets = JSON.parse(fs.readFileSync('tweetTemplate.json'));

  const JSONnews = JSON.parse(fs.readFileSync('newsTemplate.json'));

  //Toute les 2s
  schedule.scheduleJob('*/2 * * * * *', function(){
    tweets.InsertTweet(JSONtweets[getRandomInt(JSONtweets.length)]);

    InsertNews(JSONnews[getRandomInt(JSONnews.length)]);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function InsertNews(news)
{
  onNewsReceived(news);
}


function onNewsReceived(_news)
{   
  try {
    let news = new News({
      source : _news['source'],
      author : _news['author'],
      title: _news['title'],
      description: _news['description'],
      url: _news['url'],
      date: _news['date'],
      content: _news['content']
    });  

    news.save();
    console.log("News inserted");

  } catch (error) {
    console.log(error);
  }
}

