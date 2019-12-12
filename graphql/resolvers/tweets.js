const Tweets = require('../../model/tweets');

module.exports = {
    Query: {
        /**
         * @author Aurian Durand
         */
        tweets: async () => {
            return Tweets.find({createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) }}).sort({createdat: -1}).limit(1000);
        },
        /**
         * @author Aurian Durand
         */
        tweetsFromFrance: async () => {
            return Tweets.find({createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) }}).sort({createdat: -1}).limit(1000);
        },
        /**
         * @author Aurian Durand
         */
        tweetsFromCity: async (parent, args, context) => {
            return Tweets.find({'geoTweet.cityCode': args.cityCode}).sort({createdat: -1}).limit(1000);
        },
        /**
         * @author Aurian Durand
         */
        tweetsFromDepartement: async (parent, args, context) => {
            return Tweets.find({'geoTweet.departmentCode': args.depCode}).sort({createdat: -1}).limit(1000);
        },
        /**
         * @author Aurian Durand
         */
        tweetsFromRegion: async (parent, args, context) => {
            return Tweets.find({'geoTweet.regionCode': args.regCode}).sort({createdat: -1}).limit(1000);
        },
        /**
         * @author Aurian Durand
         */
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
        /**
         * @author Aurian Durand
         */
        topHashtagsFromCity: async (parent, args, context) => {
            let result = await Tweets.aggregate([
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
            return result;
        },
        /**
         * @author Aurian Durand
         */
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
        /**
         * @author Aurian Durand
         */
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
        /**
         * @author Aurian Durand
         */
        numberOfTweetsPerDayFromFrance: async (parent, args, context) => {
            return await Tweets.find({
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
            }).countDocuments() / 7;
        },
        /**
         * @author Aurian Durand
         */
        numberOfTweetsPerDayFromRegion: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.regionCode': args.regCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
            }).countDocuments() / 7;
        },
        /**
         * @author Aurian Durand
         */
        numberOfTweetsPerDayFromDepartement: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.departmentCode': args.depCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
            }).countDocuments() / 7;
        },
        /**
         * @author Aurian Durand
         */
        numberOfTweetsPerDayFromCity: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.cityCode': args.cityCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
            }).countDocuments() / 7;
        },
        /**
         * @author Aurian Durand
         */
        totalNumberOfTweetsUsedByPolytweet: async (parent, args, context) => {
            return Tweets.find().countDocuments();
        },
        /**
         * @author Aurian Durand
         */
        topHashtagsFromAllRegions: async (parent, args, context) => {
            let result = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) }
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: { hashtag: '$hashtag', regionCode: '$geoTweet.regionCode' },
                        count: { $sum: 1 }
                    }
                },
                {
                    $group: {
                        _id: '$_id.regionCode',
                        hashtags: { $addToSet: { hashtag: '$_id.hashtag', count: '$count' } },
                        count: { $sum: 1 }
                    }
                },
            ]);
            return result;
        },
        /**
         * @author Aurian Durand
         */
        topHashtagsFromAllDepartementsInOneRegion: async (parent, args, context) => {
            let result = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.regionCode': args.regCode,
                        createdat: { $gt: new Date(Date.now() - 5 * 24*60*60 * 1000) }
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: { hashtag: '$hashtag', departmentCode: '$geoTweet.departmentCode' },
                        count: { $sum: 1 }
                    }
                },
                {
                    $group: {
                        _id: '$_id.departmentCode',
                        hashtags: { $addToSet: { hashtag: '$_id.hashtag', count: '$count' } },
                        count: { $sum: 1 }
                    }
                },
            ]);
            return result;
        },
        /**
         * @author Aurian Durand
         */
        topHashtagsFromAllCitiesInOneDepartement: async (parent, args, context) => {
            let result = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.departmentCode': args.depCode,
                        createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) }
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: { hashtag: '$hashtag', cityCode: '$geoTweet.cityCode' },
                        count: { $sum: 1 }
                    }
                },
                {
                    $group: {
                        _id: '$_id.cityCode',
                        hashtags: { $addToSet: { hashtag: '$_id.hashtag', count: '$count' } },
                        count: { $sum: 1 }
                    }
                },
            ]);
            return result;
        },
    },
};