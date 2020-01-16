const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    var tweets = require('./tweets.js');

    var boundingBox = [ '-5.03', '42.28', '8.41', '51.19' ];
    tweets.StartTweetStream(boundingBox);
}).catch(err => {
  console.log(err);
});