const Tweets = require('../../model/tweets');

module.exports = {
    Query: {
        tweets: async () => {
            return Tweets.find().sort({createdat: -1}).limit(1000);
        },
    },
};