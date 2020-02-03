const https = require('https');
var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const News = require('../model/news');
const Tweet = require('../model/tweets');
const sentenceClass = require('./sentenceClass')
const dico = require('./dictionary')

module.exports = async function constructSentence(dictio)
{
    let sentence = "Bonjour, je m'appelle Alphonse de Lamartine, le chat";
    var dictionary = await Dictionary.build();
    var j = new SentenceClass(sentence, dictionary);

    let news = await News.find().limit(10)
    news.forEach(element => {
        console.log(element['description'])
        var j = new SentenceClass(element['description'], dictionary);
    });

    let tweets = await Tweet.find()
    console.log(tweets)

    
}