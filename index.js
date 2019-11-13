// server imports 
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// database import
const mongoose = require('mongoose');
const fs = require('fs');

const news = require('./news')

const clearDB = require('./clearDB');



// socket import
// const socketio = require('socket.io')

// schedule jobs import
var schedule = require('node-schedule');

// schema module import
const { merge } = require('lodash');

// schema
const typeDefs = require('./graphql/schema');

// resolvers
const newsResolvers = require('./graphql/resolvers/news');
const locationResolvers = require('./graphql/resolvers/location');
const tweetsResolvers = require('./graphql/resolvers/tweets');
const communesResolvers = require('./graphql/resolvers/communes');

// test
// const tweets = require('./test')
// tweets()

// create express server
const app = express();
const apiPath = '/graphql';

// catch routes and return the client but ignore the graphql path
app.use(express.static(__dirname + '/dist/'))
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith(apiPath)) {
    next()
  // } else if (req.originalUrl.startsWith('/tweets')) {
  // } else if (req.url == '/tweets') {
  //   tweets()
  } else {
    // res.send('Welcome to Polytweet webapp!')
    res.sendFile(__dirname + '/dist/index.html')
  }
})

const server = new ApolloServer({ 
  typeDefs, 
  resolvers: merge(
    newsResolvers,
    locationResolvers,
    tweetsResolvers,
    communesResolvers
  ),
});

server.applyMiddleware({ app });

// '* * * * * *' - runs every second
// '*/5 * * * * *' - runs every 5 seconds
// '10,20,30 * * * * *' - run at 10th, 20th and 30th second of every minute
// '0 * * * * *' - runs every minute
// '0 0 * * * *' - runs every hour (at 0 minutes and 0 seconds)

// schedule.scheduleJob('*/10 * * * * *', function(){
//   console.log('Printing every 10s');
// });

// schedule.scheduleJob('*/30 * * * * *', function() {
//   console.log('Printing every 30s')
// })

schedule.scheduleJob('0 0 * * * *', function(){
  news();
});

// news();

const Commune = require('./model/commune');
const News = require('./model/news');

// connect to the mongodb database through mongoose and then start the server
var db = mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  app.listen({ port: 4000 }, () => {
    console.log(`API ready at http://polytweet.fr${apiPath}`)
    console.log(`Client ready at http://polytweet.fr`)
  }
  )
}).catch(err => {
  console.log(err);
});

// const addCommunes = require('./trash.js')
// const addDepartements = require('./trash')
// addDepartements();
// addCommunes();

// TWEETS API //

    var StartTweetStream = require('./tweets.js');
    var boundingBox = [ '-5.03', '42.28', '8.41', '51.19' ];
    StartTweetStream(boundingBox);
	
// END //