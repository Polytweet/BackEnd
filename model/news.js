const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const news = new Schema({
    title: String,
    description: String,
    url: String,
    date: String,
    content: String,
    // var: {
    //     type: String,
    //     required: true,
    //     default: 'var'
    // },
});

module.exports = mongoose.model('News', news);

