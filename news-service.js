var schedule = require('node-schedule');

const mongoose = require('mongoose');

const news = require('./news')

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    // run the serice every 8 minutes
    schedule.scheduleJob('*/8 * * * *', function(){
      news();
    });

    // news();

}).catch(err => {
  console.log(err);
});