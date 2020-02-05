const Dico = require('./dictionary');
const fs = require('fs')
 
WordClass = class WordClass {
    constructor(value) {
      this.precedent = null;
      this.value = this.checkValue(value);
      this.suivant = null; 
      this.grammar = new Array();   
    }

    checkValue(value)
    {
        while (value.includes("?"))
        {
            let index = value.indexOf('?');
            if (index == 0)
            {
                value = value.substr(1);
                // console.log(value)
            }
            else if (index == value.length - 1)
            {
                value = value.substr(0,value.length - 1);
            }
            else
            {
                value = value.substr(0,index) + value.substr(index + 1, value.length)
            }
        } 
        while (value.includes(","))
        {
            let index = value.indexOf(',');
            if (index == 0)
            {
                value = value.substr(1);
                // console.log(value)
            }
            else if (index == value.length - 1)
            {
                value = value.substr(0,value.length - 1);
            }
            else
            {
                value = value.substr(0,index) + value.substr(index + 1, value.length)
            }
        }   
        while (value.includes("!"))
        {
            let index = value.indexOf('!');
            if (index == 0)
            {
                value = value.substr(1);
                // console.log(value)
            }
            else if (index == value.length - 1)
            {
                value = value.substr(0,value.length - 1);
            }
            else
            {
                value = value.substr(0,index) + value.substr(index + 1, value.length)
            }
        }     
        while (value.includes("."))
        {
            let index = value.indexOf('.');
            if (index == 0)
            {
                value = value.substr(1);
                // console.log(value)
            }
            else if (index == value.length - 1)
            {
                value = value.substr(0,value.length - 1);
            }
            else
            {
                value = value.substr(0,index) + value.substr(index + 1, value.length)
            }
        }
        return value;
        
        // || value.includes("!") 
        // || value.includes(",") 
        // || value.includes(";") 
        // || value.includes("."))
        // {

        // }
    }

    getPrecedent()
    {
        return this.precedent;
    }

    getSuivant()
    {
        return this.suivant;
    }

    getValue()
    {
        return this.value;
    }

    getGrammar()
    {
        return this.grammar;
    }

    setSuivant(suivant)
    {
        this.suivant = suivant;
    }

    setPrecedent(precedent)
    {
        this.precedent = precedent;
    }

    searchGrammar(dictionary)
    {
        let val = this.value.toLowerCase();
        // console.log(dictionary.listVerbs)
        if (dictionary.getVerbs().includes(val))
        {
            this.grammar[this.grammar.length] = 'Verb'
        }
        if (dictionary.listAdverbs.includes(val))
        {
            this.grammar[this.grammar.length] = 'Adverb'
        }
        if (dictionary.listNoun.includes(val))
        {
            this.grammar[this.grammar.length] = 'Noun'
        }
        if (dictionary.listDeterminant.includes(val))
        {
            this.grammar[this.grammar.length] = 'Determinant'
        }
        if (dictionary.listPronoun.includes(val))
        {
            this.grammar[this.grammar.length] = 'Pronoun'
        }
        // // this.listVerbs = async_param['listVerbs'];
        // // this.listAdverbs = async_param['listAdverbs'];
        // // this.listNoun = async_param['listNoun'];
        // // this.listProperNoun = async_param['listProperNoun'];
        // // this.listPrefix = async_param['listPrefix'];
        // this.listDeterminant = async_param['listDeterminant'];
        // this.listEnglishWord =  async_param['listEnglishWord'];  

        // return tab;
    }

    setGrammar(newGrammar)
    {
        this.grammar[this.grammar.length] = newGrammar;
    }

    resolveVerbs(dictionary)
    {
        if (this.grammar.length == 1 && this.grammar.includes("Verb"))
        {
            this.value = dictionary.getInfinitive(this.value);
        }
    }

    resolveGramar()
    {
        if (this.grammar.length == 2 && this.grammar.includes("Pronoun") && this.grammar.includes("Determinant"))
        {
            if (this.suivant.getGrammar().length == 1 && this.suivant.getGrammar().includes("Noun"))
            {
                let t = new Array();
                t[0] ="Determinant";
                this.grammar = t;
            }
            else if (this.suivant.getGrammar().length == 1 && this.suivant.getGrammar().includes("Verb"))
            {
                let t = new Array();
                t[0] ="Pronoun";
                this.grammar = t;                
            }
        }
        else if (this.grammar.length == 2 && this.grammar.includes("Noun") && this.grammar.includes("Determinant"))
        {
            let t = new Array();
            t[0] ="Determinant";
            this.grammar = t;             
        }
        else if (this.grammar.length == 2 && this.grammar.includes("Verbs") && this.grammar.includes("Noun"))
        {
            if (this.suivant.getGrammar().length == 1 && this.suivant.getGrammar().includes("Verbs")
            || (this.precedent.getGrammar().length == 1 && this.precedent.getGrammar().includes("Verbs")))
            {
                let t = new Array();
                t[0] ="Verbs";
                this.grammar = t;                
            }
            
        }
        else if (this.grammar.length == 0)
        {
            if (this.value.charCodeAt(0) >= 65 && this.value.charCodeAt(0) <= 90 && (this.precedent != null || this.suivant.getGrammar()[0] == 'ProperNoun'))
            {
                let t = new Array();
                t[0] ="ProperNoun";
                this.grammar = t;                   
            }
        }
    }
  };