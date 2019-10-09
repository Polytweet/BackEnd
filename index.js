// server imports 
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// database import
const mongoose = require('mongoose');
const fs = require('fs');

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

// test
const tweets = require('./test')
tweets()

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
    tweetsResolvers
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

// tweets()

const Commune = require('./model/commune');

// connect to the mongodb database through mongoose and then start the server
mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  app.listen({ port: 4000 }, () => {
    console.log(`API ready at http://polytweet.fr${apiPath}`)
    console.log(`Client ready at http://polytweet.fr`)
  }
  )
}).catch(err => {
  console.log(err);
});

// --------------------------------------------------------------------------------------------
// Test ajout coordonnées pour map 

const Booking = require('./model/commune');

jsonInput = () => {
  'use strict';

  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result1.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result2.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result3.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result4.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result5.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result6.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result7.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result8.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result9.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result10.json');

  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/fr-communes2016.json');
  let communes = JSON.parse(rawdata);
  communes.forEach(function(element) {
      // delete element.fields.id_geofla;
      // delete element.fields.insee_com;
      // delete element.fields.x_chf_lieu;
      // delete element.fields.y_chf_lieu;
      // delete element.fields.y_centroid;
      // delete element.fields.statut;
      // delete element.fields.z_moyen;
      // delete element.fields.x_centroid;
      // delete element.fields.code_arr;
      // delete element.record_timestamp;
      // delete element.datasetid;
      // delete element.recordid;
      // console.log('test '+element.fields.geo_shape.coordinates);
      let com = new Commune({
        fields: {
          nom_dept: element.fields.nom_dept,
          population: element.fields.population,
          code_reg: element.fields.code_reg,
          nom_reg: element.fields.nom_reg,
          geo_point_2d: element.fields.geo_point_2d,
          code_dept: element.fields.code_dept,
          code_com: element.fields.code_com,
          geo_shape: {
            _type: element.fields.geo_shape.type,
            coordinates: element.fields.geo_shape.coordinates
          },
          code_postal: element.fields.code_postal,
          superficie: element.fields.superficie,
          nom_com: element.fields.nom_com
        },
        geometry: {
          _type: element.geometry.type,
          coordinates: element.geometry.coordinates
        }
      })
      com.save();
      // console.log('-------------------')
  }, this);
}

// jsonObject = jsonInput();



// mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

//   let test = () => {
//   let resutl = Commune.find()
//   return resutl.map(commune => {
//     console.log('--------------------------->'+JSON.stringify(commune))
//     return {
//       ...commune._doc,
//       _id: commune.id
//     }
//   })
//   }
//   console.log(test())
// }).catch(err => {
//   console.log(err);
// });

// console.log(jsonObject)

// Commune.save(jsonObject[1])