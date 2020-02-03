const Tweets = require('./model/tweets.js');
const TweetsObso = require('./model/tweetsObso.js');

module.exports = async function StartHistory( obsoleteTime){
    startObsoleteFilter(obsoleteTime);
}

function startObsoleteFilter(obsoleteTime){
    console.log("Obsolete tweets filter started");

    try {
        Tweets.find({}, function(err, result){
            if(err) throw err;
            const currentData = new Date();

            for(var i = 0; i < result.length; i++){
                let difference = (currentData - result[i]['createdat']) / (1000*60*60*24);// En jour
                if(difference > obsoleteTime){
                    insertObsoleteTweets(result[i]);
                    deleteTweet(result[i].id);
                }
            }
        });   
    } catch (err) {
        console.log(err);
    }
}

async function insertObsoleteTweets(tweet) {
    let tweetsObso = new TweetsObso({
        hashtag : tweet.hashtag,
        text : tweet.text,
        geoTweet : {
            city : tweet.geoTweet.city,
            cityCode : tweet.geoTweet.cityCode,
            departmentCode : tweet.geoTweet.departmentCode,
            regionCode : tweet.geoTweet.regionCode,
        },
        createdat : tweet.createdat
    });

    await tweetsObso.save();
}

async function deleteTweet(id) {
    await Tweets.findByIdAndRemove({_id : id}, {useFindAndModify: false}, function(err){
        if(err) throw err;
        //console.log("Element deleted");
    });
}