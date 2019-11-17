// But de ce fichier est de retirer les news trop vieilles afin de ne pas surcharger la DB inutilement

var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const News = require('./model/news');
const ObjectId = mongoose.Types.ObjectId;

module.exports = async function clearDataBase() {
    getNewsToRemove(3)
    .then(function (response) {
        response.forEach(function(element) {
            console.log(element['id']);
          });   
    });
    }


    function getNewsToRemove(ancienneteARetirer) {
        return new Promise(async function (resolve, reject) {
            let toReturn = new Array();
            let newsInDB = await News.find({});
            let numbersNews = await News.countDocuments({});
            let now = new Date();
            let counter = 0;
    
            for (let i = 0; i < numbersNews; i++) {
                var time_diff = now.getTime() - newsInDB[i]['date'].getTime();
                var days_Diff = time_diff / (1000 * 3600 * 24);
                var anciennete = (Math.floor(days_Diff));
                console.log(anciennete);
                if (anciennete >= ancienneteARetirer) {
                    toReturn[counter] = newsInDB[i];
                    counter++;
                }
            }

            resolve(toReturn);
        })
    }