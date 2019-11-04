const https = require('https');
var fs = require('fs')
var request = require('request');
const mongoose = require('mongoose');
const News = require('./model/news')


module.exports = async function refreshNewsData() {

  try {
    console.log(await findAllNewsInDB());
    getNewsFromNewsAPI()
      .then(function (response) {
        splitData(response)
          .then(function (response) {
            for (var i = 0; i < response['size']; i++) {
              findANewsInDB(response[i])
              .then(function(response)
              {
                if (response['result'] == '')
                {
                  console.log('non existant dans la db, il faut l ajouter');
                  //console.log(response['data']);
                  //saveNewsInDB(response['data']['source'], response['data']['author'], response['data']['title'], response['data']['description'], response['data']['url'], response['data']['date'], response['data']['content']);
                }
                else
                {
                  console.log('cette news existe déjà dans la db, il ne faut plus l ajouter');
                 // console.log(dataToAdd);
                }
              })
            }
          })

      })

  }
  catch (error) {
    console.error(error);
  }
  // dbSave();
  //console.log(await dbFind());
}



/*
  Return a String in JSON file format with all the news
*/
function getNewsFromNewsAPI() {
  return new Promise(function (resolve, reject) {
    let toReturn = '';
    https.get('https://newsapi.org/v2/top-headlines?country=fr&apiKey=1870d19276fb4e7295d90de1b2f39ea2', (resp) => {

      resp.on('data', (chunk) => {
        toReturn += chunk;
      });
      resp.on('end', () => {
        console.log("Get News API done");
        resolve(toReturn);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  });
}



/*
  Return an array with all we need to create a news in the database
*/
function splitData(listOfNews) {
  return new Promise(function (resolve, reject) {
    let parsedList = JSON.parse(listOfNews);
    let nbNews = 20;
    let toReturn = new Array();
    toReturn['size'] = 20;

    try {
      for (let i = 0; i < nbNews; i++) {
        toReturn[i] = new Array();
        toReturn[i]['source'] = parsedList['articles'][i]['source']['name'];
        toReturn[i]['author'] = parsedList['articles'][i]['author'];
        toReturn[i]['title'] = parsedList['articles'][i]['title'];
        toReturn[i]['description'] = parsedList['articles'][i]['description'];
        toReturn[i]['url'] = parsedList['articles'][i]['url'];
        toReturn[i]['date'] = parsedList['articles'][i]['publishedAt'];
        toReturn[i]['content'] = parsedList['articles'][i]['content'];
      }

      resolve(toReturn);
    }
    catch (error) {
      console.error(error);
    }
  })
}

function saveNewsInDB(newToAdd)
{
  saveNewsInDB(newToAdd['source'], newToAdd['author'], newToAdd['title'], newToAdd['description'], newToAdd['url'], newToAdd['date'], newToAdd['content']);
}

async function saveNewsInDB(_source, _author, _title, _description, _url, _date, _content) {
  let news = new News({
    source : _source,
    author : _author,
    title: _title,
    description: _description,
    url: _url,
    date: _date,
    content: _content
  })
  await news.save();
}

async function findAllNewsInDB() {
  let result = await News.find({});
  return result;
}

function findANewsInDB(aNew) {
  return new Promise(async function (resolve, reject) {
    let result = new Array()
    result['result'] = await News.find({'source' : aNew['source'], 'author' : aNew['author'], 'title' : aNew['title'], 'description' : aNew['description'], 'url' : aNew['url'], 'date' : aNew['date'], 'content' : aNew['content']});
    result['data'] = aNew;
    resolve(result);
  })  
}


// async function dbFindNews(source, author, title, description, url, date, content) {
//   let result = await News.find({ 'source': source, 'author': author, 'title': title, 'description': description, 'url': url, 'date': date, 'content': content });
//   let toReturn = false;
//   if (result != '') {
//     toReturn = true;
//   }
//   return toReturn;
// }


