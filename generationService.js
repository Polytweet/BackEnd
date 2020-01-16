var schedule = require('node-schedule');
const mongoose = require('mongoose');

const News = require('./model/news.js');
const NewsObso = require('./model/newsObso.js');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    
    // '* * * * * *' - runs every second
    // '*/5 * * * * *' - runs every 5 seconds
    // '10,20,30 * * * * *' - run at 10th, 20th and 30th second of every minute
    // '0 * * * * *' - runs every minute
    // '0 0 * * * *' - runs every hour (at 0 minutes and 0 seconds)

    // schedule.scheduleJob('*/10 * * * * *', function(){
    //   console.log('Printing every 10s');
    // });

    // schedule.scheduleJob('*/30 * * * * *', function() {
    //   console.log('Printing every 30s')
    // })

    schedule.scheduleJob('*/2 * * * * *', function(){
      insertTweets();
      insertNews();
    });

}).catch(err => {
  console.log(err);
});

async function insertTweets()
{
  console.log("Tweets inserted");
}

async function insertNews()
{
  console.log("News inserted");
}

