//BUGNONE Michaël

const mongoose = require('mongoose');
const schedule = require('node-schedule');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  var tweetsHistory = require("./tweetsHistory.js");
  var newsHistory = require("./newsHistory.js");

    //Toute les jours à 00:00
    schedule.scheduleJob('0 0 0 * * *', function(){
      let obsoleteTimeTweets = 90;//En jours
      tweetsHistory(obsoleteTimeTweets);
    
      let obsoleteTimeNews = 90;//En jours
      newsHistory(obsoleteTimeNews);

    });
}).catch(err => {
  console.log(err);
});