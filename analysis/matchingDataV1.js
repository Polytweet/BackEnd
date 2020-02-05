const https = require('https');
var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const News = require('../model/news');
const Tweet = require('../model/tweets');
const Verb = require('../model/Words/verbs')

module.exports = async function matchingDataV1() {
    matchingV1();
}

async function matchingV1() {
    // VERSION 0 du MATCHING

    console.log('START VERSION 1 OF MATCHING')
    //Récupération des news déjà traitées
    let arrayOfNews = await getNews();
    let arrayOfTweets = await getTweets();
    let listTweetInNews = new Array();


    arrayOfTweets.forEach(async function (tw) {

        let listNews = new Array();

        arrayOfNews.forEach(async function (ne) {
            //    console.log(ne['id'])
            if (listTweetInNews[ne['id']] == undefined) {
                listTweetInNews[ne['id']] = ne['tweetsAboutIt'];
            }
            //    console.log('hola1')
            if (getSimilarity(tw['content'], ne) == true) {
                listNews[listNews.length] = ne['id'];
                if (!listTweetInNews[ne['id']].includes(tw['id'])) {
                    listTweetInNews[ne['id']][listTweetInNews[ne['id']].length] = tw['id'];
                }

            }
        });
        var newvaluesT = { $set: { newsAboutIt: listNews, checked: true } };
        var myqueryT = { _id: tw['id'] };
        await Tweet.updateOne(myqueryT, newvaluesT, function (err, res) {
            if (err) throw err;
        });
        // console.log(tw['id'])
    });

    arrayOfNews.forEach(async function (element) {
        // if (listTweetInNews[element['id']].length > 0) {
        //     // console.log(element['id'])
        // }


        var newvalues = { $set: { tweetsAboutIt: listTweetInNews[element['id']] } };
        var myquery = { _id: element['id'] };
        await News.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
    })

    console.log('END')
}

function generateSimilarity(ne, tw) {
    list1 = ne.wordList;
    let total = list1.length;
    let numberWordsFound = 0;


    list1.forEach(function (element) {
        // let isInTheTweet = text2.includes(element);
        let isInTheTweet = text2.toLowerCase().indexOf(element.toLowerCase());
        if (isInTheTweet != -1) {
            numberWordsFound++;
        }
    });

    return numberWordsFound / total;
}


function getSimilarity(tw, ne) {
    let counterProperNoun = 0;
    let listProperNoun = new Array();
    let toReturn = false;
    ne.grammarList.forEach(g => {
        if (g == "ProperNoun") {
            counterProperNoun++;
            listProperNoun[listProperNoun.length] = ne.wordList[ne.grammarList.indexOf(g)]
        }
    });

    if (counterProperNoun >= 2) {
        let counterProperNounFound = 0;
        listProperNoun.forEach(pn => {
            if (tw.indexOf(pn) != -1) {
                counterProperNounFound++;
            }
            else {
                let toLowerCaseProperNoun = pn.toLowerCase();
                if (tw.indexOf(toLowerCaseProperNoun) != -1) {
                    counterProperNounFound++;
                }
                else {
                    toLowerCaseProperNoun = toLowerCaseProperNoun.trim();
                    let toLowerCaseProperNoun_2 = "";
                    let size = toLowerCaseProperNoun.length;
                    for (let i = 0; i < size; i++) {
                        if (toLowerCaseProperNoun.charAt(i) != " ") {
                            toLowerCaseProperNoun_2 += toLowerCaseProperNoun.charAt(i);
                        }
                    }
                    if (tw.indexOf(toLowerCaseProperNoun_2) != -1) {
                        counterProperNounFound++;
                    }
                }
            }
        });
        if (((counterProperNoun >= 2) && (counterProperNounFound + (1 / 2) * counterProperNoun >= counterProperNoun))) {
            // console.log("Trouvé : " + counterProperNounFound)
            // console.log("Total : " + counterProperNoun )
            // console.log(counterProperNounFound + " trouvé pour la news \n" + ne['content'] + "\n" +tw + "\n\n")
            toReturn = true;
        }
        else {
            toReturn = getSimilarityPart2(ne, tw);
        }
    }
    else {
        toReturn = getSimilarityPart2(ne, tw);
    }
    return toReturn;
}

async function getSimilarityPart2(ne, tw) {
    toReturn = false;
    let counter = 0;
    for (let i = 0; i < ne.wordList.length; i++) {
        let n = ne.wordList[i]
        if (tw.includes(n.toLowerCase())) {
            counter++;
        }
        else {
            if (ne.grammarList[i].length != 0 && ne.grammarList.includes('Verb')) {
                let reserarchTemp = await Verb.find({ infinitive: ne.wordList[i] });
                // console.log(reserarchTemp)
                reserarchTemp.forEach(element => {
                    if (tw.includes(element)) {
                        counter++;
                    }
                });
            }
        }
    }

    // if (counter*100/ne.wordList.length > 10)
    // {
    //     console.log(counter*100/ne.wordList.length)
    // }

    if (counter * 100 / ne.wordList.length > 30) {
        // console.log("la news \n" + ne['content'] + "\nle tweet \n" +tw + "\n\n")  
        toReturn = true;
    }
    return toReturn;
}


function getSimilarity_0(tw, ar) {

    let similariteMax = 0;
    let newsSimilaire = null;

    ar.forEach(function (element) {
        let value = generateSimilarity(element['content'], tw);

        if (value > similariteMax) {
            similariteMax = value;
            newsSimilaire = element;
        }
    });

    let toReturn = new Array();
    toReturn['news'] = newsSimilaire;
    toReturn['pourcentage'] = similariteMax * 100;

    return toReturn;
}


async function getTweets() {
    let toReturn = new Array();
    // let TweetsInDB = await Tweet.find({});
    // let TweetsInDB = await Tweet.find({ checked: false }) 
    let TweetsInDB = await Tweet.find({ createdat: { $gt: new Date(Date.now() - 60*60 * 1000) } }); // la dernière heure
    // console.log(TweetsInDB);
    let counter = 0;

    TweetsInDB.forEach(function (element) {

        toReturn[counter] = new Array();
        toReturn[counter]['id'] = element['id'];
        toReturn[counter]['content'] = '';

        let words = (element['text'].toLowerCase()).split(' ');

        words.forEach(function (word) {
            toReturn[counter]['content'] += word.trim() + ' ';
        });

        element['hashtag'].forEach(function (hash) {
            toReturn[counter]['content'] += " " + hash;
        });

        counter++;

    });
    return toReturn;
}

async function getNews() {
    let newsInDB = await News.find({ date: { $gt: new Date(Date.now() - 24*60*60 * 1000) } });
    let toReturn = new Array();
    newsInDB.forEach(n => {
        if (n.wordList.length != 0) {
            toReturn[toReturn.length] = n;
        }
    });
    return toReturn;
}