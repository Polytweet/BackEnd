//BUGNONE Michaël

const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  var tweetsHistory = require("./tweetsHistory.js");
  var newsHistory = require("./newsHistory.js");

  let refreshTimeTweetsFilter = 0.5;//En jours
  let obsoleteTimeTweets = 30;//En jours
  tweetsHistory(refreshTimeTweetsFilter, obsoleteTimeTweets);

  let refreshTimeNewsFilter = 0.5;//En jours
  let obsoleteTimeNews = 30;//En jours
  newsHistory(refreshTimeNewsFilter, obsoleteTimeNews);
  
}).catch(err => {
  console.log(err);
});