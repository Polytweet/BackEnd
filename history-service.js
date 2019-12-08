const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  var history = require("./history.js");
  let refreshTime = 0.5;//In minutes
  let obsoleteTime = 2;//In minutes
  history(refreshTime, obsoleteTime);
  
}).catch(err => {
  console.log(err);
});