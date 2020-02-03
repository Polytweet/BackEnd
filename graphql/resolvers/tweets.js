const Tweets = require('../../model/tweets');

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const TOTALNUMBEROFTWEETSUSEDBYPOLYTWEET = 'TOTALNUMBEROFTWEETSUSEDBYPOLYTWEET';
const LAST10TWEETS = 'LAST10TWEETS';

var schedule = require('node-schedule');

/**
 * this function publish the total tweets number to the totalNumberOfTweetsUsedByPolytweet subscription
 * @author Aurian Durand
 */
schedule.scheduleJob('*/1 * * * * *', function(){
    pubsub.publish(TOTALNUMBEROFTWEETSUSEDBYPOLYTWEET, { totalNumberOfTweetsUsedByPolytweet: Tweets.find().countDocuments() });
});
/**
 * this function publish the last 10 tweets to the last10tweets subscription
 * @author Aurian Durand
 */
schedule.scheduleJob('*/1 * * * * *', function(){
    pubsub.publish(LAST10TWEETS, { last10tweets: Tweets.find({createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) }}).sort({createdat: -1}).limit(10) });
});

module.exports = {
    Subscription: {
        totalNumberOfTweetsUsedByPolytweet: {
          subscribe: () => pubsub.asyncIterator([TOTALNUMBEROFTWEETSUSEDBYPOLYTWEET]),
        },
        last10tweets: {
            subscribe: () => pubsub.asyncIterator([LAST10TWEETS]),
          },
    },
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
        last10tweets: async () => {
            return Tweets.find({createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) }}).sort({createdat: -1}).limit(12);
        },
        /**
         * @author Aurian Durand
         */
        tweetsFromCity: async (parent, args, context) => {
            return Tweets.find({
                    'geoTweet.cityCode': args.cityCode,
                    $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                }).sort({createdat: -1}).limit(1000);
        },
        /**
         * @author Aurian Durand
         */
        tweetsFromDepartement: async (parent, args, context) => {
            return Tweets.find({
                'geoTweet.departmentCode': args.depCode,
                $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
            }).sort({createdat: -1}).limit(1000);
        },
        /**
         * @author Aurian Durand
         */
        tweetsFromRegion: async (parent, args, context) => {
            return Tweets.find({
                'geoTweet.regionCode': args.regCode,
                $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
            }).sort({createdat: -1}).limit(1000);
        },
        /**
         * @author Aurian Durand
         */
        topHashtagsFromFrance: async (parent, args, context) => {
            return await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) },
                $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
            }).countDocuments() / 7;
        },
        /**
         * @author Aurian Durand
         */
        numberOfTweetsPerDayFromRegion: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.regionCode': args.regCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) },
                $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
            }).countDocuments() / 7;
        },
        /**
         * @author Aurian Durand
         */
        numberOfTweetsPerDayFromDepartement: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.departmentCode': args.depCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) },
                $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
            }).countDocuments() / 7;
        },
        /**
         * @author Aurian Durand
         */
        numberOfTweetsPerDayFromCity: async (parent, args, context) => {
            return await Tweets.find({
                'geoTweet.cityCode': args.cityCode, 
                createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) },
                $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
        topHashtagsFromAllDepartements: async (parent, args, context) => {
            let result = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
        topHashtagsFromAllDepartementsInOneRegion: async (parent, args, context) => {
            let result = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.regionCode': args.regCode,
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
                        createdat: { $gt: new Date(Date.now() - 3 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
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
                }
            ]);
            return result;
        },
        /**
         * @author Aurian Durand
         */
        tweetsPerDayFromAllRegions: async (parent, args, context) => {
            let result = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.regionCode',
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        count: { $divide: [ "$count", 7 ] }
                    }
                }
            ]);
            // console.log(result)
            return result;
        },
        /**
         * @author Aurian Durand
         */
        tweetsPerDayFromAllDepartements: async (parent, args, context) => {
            let result = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.departmentCode',
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        count: { $divide: [ "$count", 7 ] }
                    }
                }
            ]);
            return result;
        },
        /**
         * @author Aurian Durand
         */
        tweetsPerDayFromAllCitiesInOneDepartement: async (parent, args, context) => {
            let result = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.departmentCode': args.depCode,
                        createdat: { $gt: new Date(Date.now() - 7 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.cityCode',
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        count: { $divide: [ "$count", 7 ] }
                    }
                }
            ]);
            return result;
        },
        /**
         * @author Aurian Durand
         */
        differenceOfNumberOfTweetsPerDayFromFrance: async (parent, args, context) => {
            let last24h = await Tweets.find({
                createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) },
                $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
            }).countDocuments();
            let last48h = await Tweets.find({
                createdat: { $gt: new Date(Date.now() - 2 * 24*60*60 * 1000) },
                $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
            }).countDocuments();
            let last48hMinusLast24h = last48h - last24h
            // console.log("last24h: "+last24h+" last48hMinusLast24h: "+last48hMinusLast24h)
            return - (1 - (last24h / (last48hMinusLast24h))) * 100
        },
        /**
         * @author Aurian Durand
         */
        differenceOfNumberOfTweetsPerDayFromAllRegions: async (parent, args, context) => {
            let last24h = await Tweets.aggregate([
                {
                    $match: {
                        createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.regionCode',
                        count: { $sum: 1 }
                    }
                },
            ]);
            let last48h = await Tweets.aggregate([
                {
                    $match: {
                        createdat: { $gt: new Date(Date.now() - 2 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.regionCode',
                        count: { $sum: 1 }
                    }
                }
            ]);
            let toReturn = [];
            last24h.forEach(_24h => {
                last48h.forEach(_48h => {
                    if(_24h._id == _48h._id) {
                        if(_24h.count == _48h.count && (_24h.count > 1 && _48h.count > 1)) {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: 100
                            })
                        } else if (_24h.count > 1 && _48h.count > 1) {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: - ( 1 - ( _24h.count / (_48h.count - _24h.count) ) ) * 100
                            })
                        } else {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: 0
                            })
                        }
                    }
                })
            })
            // console.log(last24h)
            // console.log(last48h)
            return toReturn
        },
        /**
         * @author Aurian Durand
         */
        differenceOfNumberOfTweetsPerDayFromAllDepartements: async (parent, args, context) => {
            let last24h = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.departmentCode',
                        count: { $sum: 1 }
                    }
                }
            ]);
            let last48h = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        createdat: { $gt: new Date(Date.now() - 2 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.departmentCode',
                        count: { $sum: 1 }
                    }
                }
            ]);
            let toReturn = [];
            last24h.forEach(_24h => {
                last48h.forEach(_48h => {
                    if(_24h._id == _48h._id) {
                        if(_24h.count == _48h.count && (_24h.count > 1 && _48h.count > 1)) {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: 100
                            })
                        } else if (_24h.count > 1 && _48h.count > 1) {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: - ( 1 - ( _24h.count / (_48h.count - _24h.count) ) ) * 100
                            })
                        } else {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: 0
                            })
                        }
                    }
                })
            })
            return toReturn
        },
        /**
         * @author Aurian Durand
         */
        differenceOfNumberOfTweetsPerDayFromAllCitiesInOneDepartement: async (parent, args, context) => {
            let last24h = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.departmentCode': args.depCode,
                        createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.cityCode',
                        count: { $sum: 1 }
                    }
                }
            ]);
            let last48h = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.departmentCode': args.depCode,
                        createdat: { $gt: new Date(Date.now() - 2 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                {
                    $group: {
                        _id: '$geoTweet.cityCode',
                        count: { $sum: 1 }
                    }
                }
            ]);
            let toReturn = [];
            last24h.forEach(_24h => {
                last48h.forEach(_48h => {
                    if(_24h._id == _48h._id) {
                        if(_24h.count == _48h.count && (_24h.count > 1 && _48h.count > 1)) {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: 100
                            })
                        } else if (_24h.count > 1 && _48h.count > 1) {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: - ( 1 - ( _24h.count / (_48h.count - _24h.count) ) ) * 100
                            })
                        } else {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: 0
                            })
                        }
                    }
                })
            })
            return toReturn
        },
        /**
         * @author Aurian Durand
         */
        differenceOfNumberOfTweetsPerDayFromAllDepartementsInOneRegion: async (parent, args, context) => {
            let last24h = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.regionCode': args.regCode,
                        createdat: { $gt: new Date(Date.now() - 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: '$geoTweet.departmentCode',
                        count: { $sum: 1 }
                    }
                }
            ]);
            let last48h = await Tweets.aggregate([
                {
                    $match: {
                        hashtag: { $not: {$size: 0} },
                        'geoTweet.regionCode': args.regCode,
                        createdat: { $gt: new Date(Date.now() - 2 * 24*60*60 * 1000) },
                        $or: [ { newsAboutIt: { $in: [args.newsId] }} , { 'args.newsId': {$size: 0} } ]
                    }
                },
                { $unwind: "$hashtag" },
                {
                    $group: {
                        _id: '$geoTweet.departmentCode',
                        count: { $sum: 1 }
                    }
                }
            ]);
            let toReturn = [];
            last24h.forEach(_24h => {
                last48h.forEach(_48h => {
                    if(_24h._id == _48h._id) {
                        if(_24h.count == _48h.count && (_24h.count > 1 && _48h.count > 1)) {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: 100
                            })
                        } else if (_24h.count > 1 && _48h.count > 1) {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: - ( 1 - ( _24h.count / (_48h.count - _24h.count) ) ) * 100
                            })
                        } else {
                            toReturn.push({
                                zoneNumber: _24h._id,
                                percentage: 0
                            })
                        }
                    }
                })
            })
            return toReturn
        },
    },
};