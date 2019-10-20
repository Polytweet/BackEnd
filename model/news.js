const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const news = new Schema({

    fields: {
        title: String,
        description: String,
        url: String,
        date: String,
        content: String
    }
});

module.exports = mongoose.model('News', news);

