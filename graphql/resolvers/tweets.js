const Tweets = require('../../model/tweets');

module.exports = {
    Query: {
        tweets: async () => {
            return Tweets.find({createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) }}).sort({createdat: -1}).limit(1000);
        },
        tweetsFromFrance: async () => {
            return Tweets.find({createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) }}).sort({createdat: -1}).limit(1000);
        },
        tweetsFromCity: async (parent, args, context) => {
            return Tweets.find({'geoTweet.cityCode': args.cityCode}).sort({createdat: -1}).limit(1000);
        },
        tweetsFromDepartement: async (parent, args, context) => {
            return Tweets.find({'geoTweet.departmentCode': args.depCode}).sort({createdat: -1}).limit(1000);
        },
        tweetsFromRegion: async (parent, args, context) => {
            return Tweets.find({'geoTweet.regionCode': args.regCode}).sort({createdat: -1}).limit(1000);
        },
        topHashtagsFromFrance: async (parent, args, context) => {
            return await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) }
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: '$hashtag',
                        count: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        count: { $gte: 1 }
                    }
                },
                { $sort : { count : -1} },
                { $limit : 10 }
            ]);
        },
        topHashtagsFromCity: async (parent, args, context) => {
            return await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.cityCode': args.cityCode,
                        createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: '$hashtag',
                        count: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        count: { $gte: 1 }
                    }
                },
                { $sort : { count : -1} },
                { $limit : 10 }
            ]);
        },
        topHashtagsFromDepartement: async (parent, args, context) => {
            return await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.departmentCode': args.depCode,
                        createdat: { $gt: new Date(Date.now() - 5 * 24*60*60 * 1000) }
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: '$hashtag',
                        count: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        count: { $gte: 1 }
                    }
                },
                { $sort : { count : -1} },
                { $limit : 10 }
            ]);
        },
        topHashtagsFromRegion: async (parent, args, context) => {
            return await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.regionCode': args.regCode,
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) }
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: '$hashtag',
                        count: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        count: { $gte: 1 }
                    }
                },
                { $sort : { count : -1} },
                { $limit : 10 }
            ]);
        },
        numberOfTweetsPerDayFromFrance: async (parent, args, context) => {
            return await Tweets.find({createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }}).count() / 7;
        },
        numberOfTweetsPerDayFromRegion: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.regionCode': args.regCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
            }).count() / 7;
        },
        numberOfTweetsPerDayFromDepartement: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.departmentCode': args.depCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
            }).count() / 7;
        },
        numberOfTweetsPerDayFromCity: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.cityCode': args.cityCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
            }).count() / 7;
        },
    },
};