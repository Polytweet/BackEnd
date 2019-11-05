// But de ce fichier est de retirer les news trop vieilles afin de ne pas surcharger la DB inutilement

var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const News = require('./model/news');

module.exports = async function clearDataBase() {
    let newsInDB = await News.find({});
    console.log("HOLA");
    
}