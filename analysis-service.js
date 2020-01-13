const mongoose = require('mongoose');
const matchingDataV0 = require('./matchingDataV0');
const matchingDataV1 = require('./matchingDataV1');
// const cleanDico = require('./cleanDico');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  //Version 0 un peu cassée
  matchingDataV0();  
  
  //Version 1 avec utilisation de l'API sans traitement préalable sur les textes
  // matchingDataV1();
  
  // cleanDico();
  

}).catch(err => {
  console.log(err);
});