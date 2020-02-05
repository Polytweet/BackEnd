const mongoose = require('mongoose');
const matchingDataV1 = require('./analysis/matchingDataV1');
const preparationData = require('./analysis/preparationData');
var schedule = require('node-schedule');
const cleanDico = require('./cleanDico');
const Dico = require('./analysis/dictionary')

let dictionnary;

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  //Version 0 un peu cassée
  // matchingDataV0();  
  // run the serice every 10 minutes
  // schedule.scheduleJob('*/5 * * * *', function(){
  //   preparationData();
  // });

  
  //Version 1 avec utilisation de l'API sans traitement préalable sur les textes
  // schedule.scheduleJob('*/6 * * * *', function(){
    matchingDataV1();
  // });
  
  // cleanDico();
  

}).catch(err => {
  console.log(err);
});