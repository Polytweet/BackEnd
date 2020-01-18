//BUGNONE Michaël

const mongoose = require('mongoose');
const schedule = require('node-schedule');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  var tweetsHistory = require("./tweetsHistory.js");
  var newsHistory = require("./newsHistory.js");

    //Toute les 2s
    schedule.scheduleJob('*/2 * * * * *', function(){
      let obsoleteTimeTweets = 1;//En jours
      tweetsHistory(obsoleteTimeTweets);
    
      let obsoleteTimeNews = 1;//En jours
      newsHistory(obsoleteTimeNews);

    });
}).catch(err => {
  console.log(err);
});