const https = require('https');
var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const News = require('./model/news');
const Tweet = require('./model/tweets');
const MatchingTN = require('./model/matchingTN');

module.exports = async function matchingDataV0() {
    matchingV0();
}

async function matchingV0() {
    // VERSION 0 du MATCHING

    console.log('START VERSION 0 du MATCHING')

    let arrayOfNews = await getTitleNews();
    let arrayOfTweets = await getTweets({checked:false});
    console.log(arrayOfNews.length);
    console.log(arrayOfTweets.length);
    arrayOfTweets.forEach(async function (tw) {      

        let ressemblance = getSimilarity_0(tw['content'], arrayOfNews);
        await Tweet.updateOne(
            { _id: tw['id'] },
            {
                $set: {
                    checked: true
                }
            }
        )

        let t = await Tweet.findById(tw['id']);
        let n = await News.findById(ressemblance['news']['id']);

        // console.log(t['newsAboutIt'].length);


        if (ressemblance['pourcentage'] > 40)
        {
            console.log("Le tweet \n" + t + "\n ressemble à " + ressemblance['pourcentage'] + "% à la news \n" + n);
            // await MatchingTN.save({ news: ressemblance['news']['id'], tweet: tw['id'], percentage: ressemblance['pourcentage'], algorithmUsed : "ALGO_0"});
            
            let listNewsAboutit = t['newsAboutIt'];
            // listNewsAboutit[listNewsAboutit.length] = ressemblance['news']['id'];
            
            // await Tweet.updateOne(
            //     { _id: tw['id'] },
            //     {
            //         $set: {
            //             newsAboutIt: listNewsAboutit
            //         }
            //     }
            // )
            
            // si le tweets ne contient pas déjà la news dans newsAboutIt, alors l'ajouter
            if(!listNewsAboutit.includes(ressemblance['news']['id'])) {

                await Tweet.updateOne(
                    { _id: tw['id'] },
                    {
                        $push: { newsAboutIt: ressemblance['news']['id'] }
                    }
                )

                await News.updateOne(
                    { _id: n._id },
                    {
                        $push: { tweetsAboutIt: tw['id'] }
                    }
                )

            }
       
        }
    });

}

function generateSimilarity(text1, text2) {
    list1 = text1.split(' '); //news
    let total = list1.length;
    let numberWordsFound = 0;


    list1.forEach(function (element) {
        // let isInTheTweet = text2.includes(element);
        let isInTheTweet = text2.indexOf(element);
        if (isInTheTweet != -1) {
            numberWordsFound++;
        }
    });

    return numberWordsFound / total;
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
    let TweetsInDB = await Tweet.find({ createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) } })
    // console.log(TweetsInDB);
    let counter = 0;

    TweetsInDB.forEach(function (element) {

        toReturn[counter] = new Array();
        toReturn[counter]['id'] = element['id'];
        toReturn[counter]['content'] = '';

        let words = (element['text'].toLowerCase()).split(' ');

        words.forEach(function (word) {
            if ((word[0] != '#') && (word[0] != '@') && !((word[0] == 'h') && (word[1] == 't') && (word[2] == 't') && (word[3] == 'p'))) {
                toReturn[counter]['content'] += word + ' ';
            }
        });

        element['hashtag'].forEach(function (hash) {
            toReturn[counter]['content'] += " " + hash;
        });

        counter++;

    });
    return toReturn;
}

async function getTitleNews() {
    var motsASupprimer = ['et', 'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'ce', 'cet', 'cette',
        'ces', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre', 'nos', 'votre', 'vos',
        'leur', 'leurs', 'en', 'par', 'ne', 'dans', 'pour', 'quel', 'quelle', 'quels', 'quelles', 'qui', 'quoi',
        'a', 'as', 'avons', 'avez', 'ont', 'suis', 'es', 'est', 'sommes', 'êtes', 'sont', 'il', 'elle', 'figaro',
        'lci', 'ils', 'elles', 'on', 'an', 'au', 'aux', 'bfmtv.com'];
    // let newsInDB = await News.find({}); 
    let newsInDB = await News.find({ date: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) } });
    //console.log(newsInDB);
    let toReturn = new Array();
    let counterToReturn = 0;

    newsInDB.forEach(function (element) {
        toReturn[counterToReturn] = new Array();
        toReturn[counterToReturn]['id'] = element['id'];

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

        toReturn[counterToReturn]['content'] = "";
        cleanWords.forEach(function (e) {
            toReturn[counterToReturn]['content'] += " " + e;
        });

        counterToReturn++;
    });
    return toReturn;
}