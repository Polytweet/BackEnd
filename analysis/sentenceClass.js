const wordClass = require('./wordClass');
const Expression = require('../model/Words/expression')
const NominalDet = require('../model/Words/nominaldet')

let dictionary;

SentenceClass = class SentenceClass {

  constructor(sentence, dictio) {


    dictionary = dictio;
    this.wordList = new Array();
    if (sentence != null) {
      //Création d'une liste d'objet WordClass
      this.createArray(sentence);
      //Définition du mot qui précède chaque mot
      this.putPrecedent();
      //Definition du mot qui suit chaque mot
      this.putSuivant();
      //Si jamais il y a des mots vides (exemple le mot '?', celui-ci est retiré)
      this.wordList = this.removeEmptyWord();
      //Phrase après premier traitement
      this.newSentence = this.createNewSentence();

      //recherche nom propre
      let propNoun = dictionary.getProperNoun();
      propNoun.forEach(element => {
        // console.log(element)
        if (sentence.includes(element['value']))
        {
          // let size = element['value'].length;
          // let index = this.newSentence.indexOf(element['value'][0])
          // let wordReplace = new WordClass(element['value']);
          let size =  element['value'].split(' ').length
          // console.log(element);
          if (element['value'].includes('-'))
          {
            let t = element['value'].split('-')
            let s = ''
            t.forEach(e =>
              {
                s += e + ' '
              })
          }
          let t = element['value'];
          if (element['value'].includes(' '))
          {
            let s = element['value'].split(' ')
            t = s[0]
          }
          // console.log(this.newSentence.indexOf(t))
          for (let i = this.newSentence.indexOf(t) ; i < this.newSentence.indexOf(t) + size - 1; i++)
          {
            // console.log(this.wordList[i].getValue())
            this.wordList[i].setGrammar('ProperNoun')
            // console.log(this.wordList[i].getGrammar())
          }
        }
      });

      this.wordList.forEach(element => {
        if (element.getGrammar().length == 0)
        {
          element.searchGrammar(dictionary);
        }
      });
      this.wordList.forEach(element => {
        if (element.getGrammar().length > 1)
        {
          element.resolveGramar()          
        }
        console.log(element.getValue())
        console.log(element.getGrammar())
      });

      // this.wordList.forEach(element => {
      //   if (element.getGrammar().length == 1 && element.getGrammar()[0] == 'Verb')
      //   {
          
      //   }
      // });
      
      // console.log(this.wordList)
    }
    console.log('END')
  }

  //Permet de créer une liste correcte des mots à analyser (sans les ' ou les -) puis de créer des objets WordClass
  createArray(sentence) {
    let tab = sentence.split(' ');
    if (tab[0] != null && tab[1] != null) {
      //On divise les mots si jamais ils possèdent des ' ou des -
      let tab2 = new Array();

      // let listProperNoun = this.dictionary.getProperNoun();
      // listProperNoun.forEach(pn =>
      //   {
      //     if (this.sentence.includes(pn))
      //     {
      //       let size = pn.length;
      //       for (let i = this.sentence.indexOf())
      //     }
      //   });

      for (let k = 0; k <= tab.length - 1; k++) {
        if (tab[k].includes("'") || tab[k].includes("-")) {
          let div;
          // console.log('apostrophe')
          if (tab[k].includes("'")) {
            div = tab[k].split("'");
          }
          else {
            div = tab[k].split("-");
          }

          tab2[tab2.length] = div[0];
          tab2[tab2.length] = div[1];
        }
        else {
          tab2[tab2.length] = tab[k];
        }
      }

      for (let i = 0; i < tab2.length; i++) {
        this.wordList[this.wordList.length] = new WordClass(tab2[i])
      }
    }
  }

  putPrecedent()
  {
    for (let i = 1; i < this.wordList.length ; i++)
    {
      this.wordList[i].setPrecedent(this.wordList[i-1])
    }
  }

  putSuivant()
  {
    for (let i = 0 ; i < this.wordList.length - 1 ; i++)
    {
      this.wordList[i].setSuivant(this.wordList[i + 1])
    }
  }

  removeEmptyWord()
  {
    let newList = new Array();
    this.wordList.forEach(element => {
      if (element != null && element.getValue() != '')
      {
        newList[newList.length] = element;
      }      
    });
    return newList;
  }

  checkProperNoun()
  {
    // this.dictionary.getProperNoun().forEach(element =>
    //   {
    //     if (this.sentence.includes())
    //   });
    
    // this.sentence(element =>
    //   {
    //     if (element.getGrammar() == 'ProperNoun')
    //     {

    //     }
    //   });
  }

  createNewSentence()
  {
    let s = ''
    this.wordList.forEach(element => 
      {
        s += element.getValue() + ' ';
      })
    return s.split(' ');
  }
}

