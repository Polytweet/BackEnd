const https = require('https');
var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const News = require('./model/news');

module.exports = async function matchingData() {

let tab = await getTitleNews();
console.log(tab);
}


async function getTitleNews()
{
    var motsASupprimer = ['et','le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'ce', 'cet', 'cette', 
    'ces', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre', 'nos', 'votre', 'vos', 
    'leur', 'leurs', 'en', 'par', 'ne', 'dans', 'pour', 'quel', 'quelle', 'quels' , 'quelles', 'qui', 'quoi'];
    let newsInDB = await News.find({});
    let toReturn = new Array();
    let counterToReturn = 0;

    newsInDB.forEach(function (element) {
        // console.log(element['title']);
        let words = (element['title'].toLowerCase()).split(' ');
        //console.log(words);

        let cleanWords = new Array();
        let counter = 0;
        words.forEach(function (element2) {
            if (element2.length > 1) {

                let aSupp = false;

                motsASupprimer.forEach(function (words2) {
                    if (element2 == words2) {
                        aSupp = true;
                    }
                });

                if (aSupp == false) {
                    cleanWords[counter] = element2;
                    counter++;
                }
            }
        });

        toReturn[counterToReturn] = cleanWords;
        counterToReturn ++;
    });
    return toReturn;
}