const https = require('https');
var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const News = require('../model/news');
const Tweet = require('../model/tweets');
const sentenceClass = require('./sentenceClass')
const dico = require('./dictionary')
const WordClass = require('../analysis/wordClass')

module.exports = async function constructSentence() {
    var dictionary = await Dictionary.build();
    let news = await News.find({ wordList: [], grammarList: [] }).limit(5)
    if (news != undefined && news != null  && news != []) {
        news.forEach(newsToAnalize => {
            // console.log(newsToAnalize)
            // console.log("mot = " + newsToAnalize['description'])
            if (newsToAnalize['description'] != null || newsToAnalize['title'] != null) {

                var treatedReturn = '';

                if (newsToAnalize['description'] == null || newsToAnalize['description'] == undefined || newsToAnalize['description'].length < 30) {
                    var sentence = new SentenceClass(newsToAnalize['title'], dictionary);
                    treatedReturn = 'title';
                } else if (newsToAnalize['title'] == null || newsToAnalize['title'] == undefined) {
                    var sentence = new SentenceClass(newsToAnalize['description'], dictionary);
                    treatedReturn = 'description'
                }
                else {
                    if (newsToAnalize['description'].length > 1000) {
                        var sentence = new SentenceClass(newsToAnalize['title'], dictionary);
                        treatedReturn = 'title'
                    }
                    else {
                        var sentence = new SentenceClass(newsToAnalize['description'], dictionary);
                        treatedReturn = 'description'
                    }
                }

                var newWordList = new Array();
                var newGrammarList = new Array();
                // console.log(sentence)
                if (sentence.wordList.length != 0) {
                    sentence.wordList.forEach(w => {
                        // console.log(w.value)
                        if ((w.getGrammar().length == 1 && (w.getGrammar()[0] == "Determinant") || (w.getGrammar()[0] == "Adverb")) || w.value.length <= 2) {
                        }
                        else {
                            newWordList[newWordList.length] = w.value;
                            newGrammarList[newGrammarList.length] = w.grammar;
                        }
                    });
                    var newvalues = { $set: { wordList: newWordList, grammarList: newGrammarList, treated : treatedReturn } };
                    var myquery = { _id: newsToAnalize['id'] };
                    News.updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                    });
                    console.log("News updated")

                }
            }
        });
    }
}
