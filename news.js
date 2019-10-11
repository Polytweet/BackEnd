//const NewsAPI = require('newsapi');

const https = require('https');

module.exports = function news () {
    // printNews();
    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}

function printNews() {
    console.log("News");
    //https://newsapi.org/v2/top-headlines?country=fr&apiKey=1870d19276fb4e7295d90de1b2f39ea2

    
      
}