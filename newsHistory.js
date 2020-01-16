const News = require('./model/news.js');
const NewsObso = require('./model/newsObso.js');

module.exports = async function StartHistory(refreshTime, obsoleteTime){
    let myVar = setInterval(function(){ startObsoleteFilter(obsoleteTime) }, refreshTime * (1000*60*60*24));
}

function startObsoleteFilter(obsoleteTime){
    console.log("Obsolete news filter started");

    try {
        News.find({}, function(err, result){
            if(err) throw err;
            const currentData = new Date();

            for(var i = 0; i < result.length; i++){
                let difference = (currentData - result[i]['date']) / (1000*60*60*24);// En jour
                console.log(difference);
                if(difference > obsoleteTime){
                    insertObsoleteNews(result[i]);
                    deleteNews(result[i].id);
                }
            }
        });   
    } catch (err) {
        console.log(err);
    }
}

async function insertObsoleteNews(news) {
    let newsObso = new NewsObso({
        source : news.source,
        author : news.author,
        title: news.title,
        description: news.description,
        url: news.url,
        date: news.date,
        content: news.content,
    });

    await newsObso.save();
}

async function deleteNews(id) {
    News.findByIdAndRemove({_id : id}, {useFindAndModify: false}, function(err){
        if(err) throw err;
        //console.log("Element deleted");
    });
}