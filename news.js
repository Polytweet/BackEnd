const https = require('https');
var fs = require('fs')
var request = require('request');
const mongoose = require('mongoose');


module.exports = function news() {
  
  
}


function getNewsFromNewsAPI() {
  https.get('https://newsapi.org/v2/top-headlines?country=fr&apiKey=1870d19276fb4e7295d90de1b2f39ea2', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));

    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
