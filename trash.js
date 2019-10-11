// --------------------------------------------------------------------------------------------
// Test ajout coordonnées pour map 

const Commune = require('./model/commune');
const Departement = require('./model/departement')

var fs = require("fs");
module.exports = jsonInput = () => {
  'use strict';

  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result1.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result2.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result3.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result4.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result5.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result6.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result7.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result8.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result9.json');
  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result10.json');

  let rawdata = fs.readFileSync('./model/dept.json');
  let communes = JSON.parse(rawdata);
  communes.features.forEach(function(element) {
    var dept;
    if(element.geometry.type == 'MultiPolygon') {
      dept = new Departement({
        _type: element.type,
        properties: {
          code: element.properties.code,
          nom: element.properties.nom
        },
        geometry: {
          _type: element.geometry.type,
          coordinatesMulti: element.geometry.coordinates
        }
      })
    } else {
      dept = new Departement({
        _type: element.type,
        properties: {
          code: element.properties.code,
          nom: element.properties.nom
        },
        geometry: {
          _type: element.geometry.type,
          coordinates: element.geometry.coordinates
        }
      })
    }
       
      dept.save(); 
      // console.log(element.geometry.type)
      // console.log(element.geometry.coordinates)
  }, this);
}
// jsonInput()



// mongoose.connect(`mongodb://localhost/polytweet-database`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

//   let test = () => {
//   let resutl = Commune.find()
//   return resutl.map(commune => {
//     console.log('--------------------------->'+JSON.stringify(commune))
//     return {
//       ...commune._doc,
//       _id: commune.id
//     }
//   })
//   }
//   console.log(test())
// }).catch(err => {
//   console.log(err);
// });

// console.log(jsonObject)

// Commune.save(jsonObject[1])