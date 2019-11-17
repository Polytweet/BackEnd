const mongoose = require('mongoose');
const matchingData = require('./matchingData');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  matchingData();   
  

}).catch(err => {
  console.log(err);
});