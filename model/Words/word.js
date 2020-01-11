const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const word = new Schema({
    lemma: String,
    pos: String,
    feat: {
        name: String,
        value: String
    },
    inflected: [
        {
            form: String,
            feat: [
                {
                name: String,
                value: String
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Word', word);

