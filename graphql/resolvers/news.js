const News = require('../../model/news');

module.exports = {
    Query: {
        /**
         * @author Aurian Durand
         */
        news: async () => {
            return News.find({ tweetsAboutIt: { $exists: true, $not: {$size: 0} } }).sort({date: -1}).limit(1000);
        },
    },
};