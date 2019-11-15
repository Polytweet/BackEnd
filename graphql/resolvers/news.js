const News = require('../../model/news');

module.exports = {
    Query: {
        news: async () => {
            return News.find().sort({date: -1}).limit(1000);
        },
    },
};