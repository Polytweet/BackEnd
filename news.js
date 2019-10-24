const https = require('https');
var fs = require('fs')
var request = require('request');
const mongoose = require('mongoose');
const News = require('./model/news')

async function dbSave() {
  let news = new News({
    title: 'title 1',
    description: 'desc 1',
    url: 'url 1',
    date: 'today',
    content: 'my first mongodb query ;)'
  })
  await news.save();
}

async function dbFind() {
  let result = await News.find({});
  return result;
}


module.exports = async function news() {
  // getNewsFromNewsAPI();
  // dbSave();
  console.log(await dbFind());
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
      // console.log(JSON.stringify(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
