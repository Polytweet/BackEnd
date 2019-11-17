const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    
  // your code here

}).catch(err => {
  console.log(err);
});