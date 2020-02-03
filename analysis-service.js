const mongoose = require('mongoose');
const matchingDataV0 = require('./analysis/matchingDataV1');
const preparationData = require('./analysis/preparationData');
var schedule = require('node-schedule');
// const matchingDataV1 = require('./matchingDataV1');
const cleanDico = require('./cleanDico');
const Dico = require('./analysis/dictionary')

let dictionnary;

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  //Version 0 un peu cassée
  // matchingDataV0();  

  // run the serice every 10 minutes
  // schedule.scheduleJob('*/10 * * * *', function(){
  //   matchingDataV0();
  // });

  
  //Version 1 avec utilisation de l'API sans traitement préalable sur les textes
  // matchingDataV1();
  
  // cleanDico();
  preparationData();

}).catch(err => {
  console.log(err);
});