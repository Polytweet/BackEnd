const https = require('https');
var fs = require('fs');
var request = require('request');
const mongoose = require('mongoose');
const Expression = require('../model/Words/expression');
const Group = require('../model/Words/group');
const Noun = require('../model/Words/noun');
const Adverb = require('../model/Words/adverb');
const EnglishWord = require('../model/Words/englishWord');
const Prefix = require('../model/Words/prefix');
const Determinant = require('../model/Words/determinant');
const Verb = require('../model/Words/verbs');
const ProperNoun = require('../model/Words/properNoun')
const Pronoun = require('../model/Words/pronoun')

Dictionary = class Dictionary {

        constructor (async_param) {
            if (typeof async_param === 'undefined') {
                throw new Error('Cannot be called directly');
            }
            else
            {
                this.listVerbs = async_param['listVerbs'];
                this.listAdverbs = async_param['listAdverbs'];
                this.listNoun = async_param['listNoun'];
                this.listProperNoun = async_param['listProperNoun'];
                this.listPrefix = async_param['listPrefix'];
                this.listDeterminant = async_param['listDeterminant'];
                this.listEnglishWord =  async_param['listEnglishWord'];
                this.listPronoun = async_param['listPronoun']; 
            }
        }
    
        static async build () {
            var async_result = new Array();
            async_result['listVerbs'] = await loadVerbs();
            async_result['listAdverbs'] = await loadAdverb();
            async_result['listNoun'] = await loadNoun();
            async_result['listProperNoun'] = await loadProperNoun();
            async_result['listDeterminant'] = await loadDeterminant();
            async_result['listPronoun'] = await loadPronoun();
            return new Dictionary(async_result);
        }
    
        getProperNoun()
        {
            return this.listProperNoun;
        }

        getVerbs()
        {
            let toReturn = new Array();
            this.listVerbs.forEach(element => {
                toReturn[toReturn.length] = element['value'];
            });
            return toReturn;        
        }

        getInfinitive(val)
        {
            let index = this.getVerbs().indexOf(val);
            if (index != - 1)
            {
                return(this.listVerbs[index]['infinitive']);
            }
            else
            {
                return val;
            }
        }
}

async function loadVerbs()
{
    let result = await Verb.find();
    return result;
}

async function loadAdverb()
{
    let result = await Adverb.find();
    let toReturn = new Array();
    result.forEach(element => {
        toReturn[toReturn.length] = element['value'];
    });
    return toReturn;
}

async function loadPronoun()
{
    let result = await Pronoun.find();
    let toReturn = new Array();
    result.forEach(element => {
        toReturn[toReturn.length] = element['value'];
    });
    return toReturn;
}

async function loadNoun()
{
    let result = await Noun.find();
    let toReturn = new Array();
    result.forEach(element => {
        toReturn[toReturn.length] = element['value'];
    });
    return toReturn;
}

async function loadProperNoun()
{
    return await ProperNoun.find();
}

async function loadPrefix()
{
    return await Prefix.find();
}

async function loadDeterminant()
{
    let result = await Determinant.find();
    let toReturn = new Array();
    result.forEach(element => {
        toReturn[toReturn.length] = element['value'];
    });
    return toReturn;
}

async function loadEnglishWord()
{
    let result = await EnglishWord.find();
    let toReturn = new Array();
    result.forEach(element => {
        toReturn[toReturn.length] = element['value'];
    });
    return toReturn;
    
}



