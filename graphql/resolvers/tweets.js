const Tweets = require('../../model/tweets');

module.exports = {
    Query: {
        tweets: async () => {
            return Tweets.find().sort({createdat: -1}).limit(1000);
        },
        tweetsFromCity: async (parent, args, context) => {
            return Tweets.find({'geoTweet.cityCode': args.cityCode}).sort({createdat: -1})
        },
        tweetsFromDepartement: async (parent, args, context) => {
            return Tweets.find({'geoTweet.departmentCode': args.depCode}).sort({createdat: -1})
        },
        tweetsFromRegion: async (parent, args, context) => {
            return Tweets.find({'geoTweet.regionCode': args.regCode}).sort({createdat: -1})
        }
    },
};