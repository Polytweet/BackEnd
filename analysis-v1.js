const mongoose = require('mongoose');
var schedule = require('node-schedule');
const matchingDataV1 = require('./analysis/matchingDataV1');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 

  // run the serice every 10 minutes
  // schedule.scheduleJob('*/10 * * * *', function(){
  //   matchingDataV1();
  // });

  //Version 1 avec utilisation de l'API sans traitement préalable sur les textes
  matchingDataV1();

}).catch(err => {
  console.log(err);
});