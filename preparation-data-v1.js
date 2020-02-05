const mongoose = require('mongoose');
const preparationData = require('./analysis/preparationData');
var schedule = require('node-schedule');

mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 

  // run the serice every 10 minutes
  // schedule.scheduleJob('*/10 * * * *', function(){
  //   preparationData();
  // });

  preparationData();

}).catch(err => {
  console.log(err);
});