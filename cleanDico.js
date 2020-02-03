const https = require('https');
var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const Word = require('./model/Words/word');
const Expression = require('./model/Words/expression');
const Group = require('./model/Words/group');
const Noun = require('./model/Words/noun');
const Dictionary = require('./model/Words/dictionary');
const Adverb = require('./model/Words/adverb');
const EnglishWord = require('./model/Words/englishWord');
const Prefix = require('./model/Words/prefix');
const Determinant = require('./model/Words/determinant');
const Verb = require('./model/Words/verbs');
const ProperNoun = require('./model/Words/properNoun')
const Pronoun = require('./model/Words/pronoun');


module.exports = async function cleanDico() {
    // let verb = new Noun({ value:'comédienne' });
    // await verb.save();  
    // console.log('end')  
    // console.log(await ProperNoun.find({value : "féminicide"}))
    // ProperNoun.findByIdAndRemove({ _id: '5e380d96ccccb21f943c3cab' }, { useFindAndModify: false }, function (err) {
    //     if (err) throw err;
    // });   
}
//     let counter = 0;
//     console.log(await Word.count())
//     console.log(await Pronoun.find({value : "je"}))
//     var word =await Word.find().limit(50000);
//     word.forEach(async function (w) {
//         if (w['pos'] == 'pronoun')
//         {
//             // let verb = new Pronoun({ value: w['lemma']});
//             // await verb.save();            
//             // Word.findByIdAndRemove({ _id: w['_id'] }, { useFindAndModify: false }, function (err) {
//             //     if (err) throw err;
//             // });   
//             // counter++ 
//         }
//         else
//         {
//             Word.findByIdAndRemove({ _id: w['_id'] }, { useFindAndModify: false }, function (err) {
//                 if (err) throw err;
//             }); 
//         }

//     });

//     console.log(counter)


//     // let noun = await Noun.find();
//     // noun.forEach(async function (w) {
//     //     let h = new Array();
//     //     h = w['value'].split(' ');
//     //     s = h.length;
        

//     //     if (s > 1)
//     //     {
//     //         console.log(s)
//     //     }        
//     // });

// console.log('END')


// }
// //     let words = await Word.find().limit(10000);
// //     words.forEach(async function (w) {
// //         // console.log(w['lemma'])
// //         let test = await Word.findOne({value:w['lemma']});
// //         // let test = await Verb.findOne({value:'manges'});
// //         if (test == null)
// //         {
// //             let verb = new Verb({ value: w['lemma'], infinitive: w['lemma'] });
// //             verb.save();
// //         }
// //         Word.findByIdAndRemove({ _id: w['_id'] }, { useFindAndModify: false }, function (err) {
// //             if (err) throw err;
// //         });  
// //         // console.log(test)

// //     // let verb = await Verb.find();
// //     // console.log(verb);


// //     // // // console.log(words);
// //     // let adverb = await Adverb.find();
// //     // console.log(adverb);
// //     // let exp =  Expression.count();
// //     // console.log(exp);
// //     // console.log("fin d'affichage des expressions");
// //     // let g = await Group.find();
// //     // console.log(g);
// //     // console.log(words[2]['feat']);

// //     // var counter = 0;


// //     // words.forEach(async function (w) {
// //     //     if (w['pos'] != 'verb')
// //     //     {
// //     //         Word.findByIdAndRemove({ _id: w['_id'] }, { useFindAndModify: false }, function (err) {
// //     //             if (err) throw err;
// //     //         });
// //     //     }
// //     //     else
// //     //     {
// //     //         if (w['inflected']['feat'] != []) {
// //     //                 listInflected = w['inflected'];
// //     //                 listInflected.forEach(async function (i) {
// //     //                     let verb = new Verb({ value: i['form'], infinitive: w['lemma'] });
// //     //                     verb.save();
// //     //                     Word.findByIdAndRemove({ _id: w['_id'] }, { useFindAndModify: false }, function (err) {
// //     //                         if (err) throw err;
// //     //                     });
// //     //                 });
// //     //         }
// //     //         else
// //     //         {
// //     //             Word.findByIdAndRemove({ _id: w['_id'] }, { useFindAndModify: false }, function (err) {
// //     //                 if (err) throw err;
// //     //             });               
// //     //         }
            
// //     //     }
// //         // console.log(w['pos']);


// //     });
// //     // console.log(counter);
// //     console.log('END');

// // }
// //         // if (w['pos'] == 'preppro')
// //         // {
// //         //     // let exp = new Determinant({ value: w['lemma'] });
// //         //     // exp.save();
// //         //     Word.findByIdAndRemove({ _id: w['_id'] }, { useFindAndModify: false }, function (err) {
// //         //         if (err) throw err;
// //         //     });  
// //         //     // if (w['lemma'][1] == null)   
// //         //     // {
// //         //     //     console.log(w['lemma']) 
// //         //     // }   

// //         // }
// //         // console.log(w['pos'])
// //         // console.log(await Determinant.count())
// //         // console.log(w['pos']);


// //         // let exp = new EnglishWord({ value: w['lemma'] });
// //         // exp.save();
// //         // Word.findByIdAndRemove({_id : w['_id']}, {useFindAndModify: false}, function(err){
// //         //     if(err) throw err;
// //         // });

// // //  let expressions = await Expression.find();
// //     //  expressions.forEach(async function(e) {
// //     //     console.log(e);
// //     //  });
// //                 //  let exp = new Expression({ value: w['lemma'] });
// //             // await exp.save();
// //             // Word.findByIdAndRemove({_id : w['_id']}, {useFindAndModify: false}, function(err){
// //             //     if(err) throw err;
// //             // });
// //             // console.log(w['lemma']);
// //             // console.log(w['pos']);