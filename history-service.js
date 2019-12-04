const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  var history = require("./history.js");
  history.StartHistory();

}).catch(err => {
  console.log(err);
});