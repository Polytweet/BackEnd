const News = require('../../model/news');

module.exports = {
    Query: {
        /**
         * @author Aurian Durand
         */
        news: async () => {
            return News.find().sort({date: -1}).limit(1000);
        },
    },
};