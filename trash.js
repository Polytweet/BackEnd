// --------------------------------------------------------------------------------------------
// Test ajout coordonnées pour map 

const Commune = require('./model/commune');
const Departement = require('./model/departement')
const Region = require('./model/region')
var fs = require("fs");

module.exports = addCommunes = () => {
  'use strict';

  let rawdata = fs.readFileSync('./model/result10.json');

  let communes = JSON.parse(rawdata);
  communes.forEach(function(element) {
    var com;
    if(element.fields.geo_shape.type == 'MultiPolygon') {
      com = new Commune({
        _type: element.type,
        fields: {
          nom_dept: element.fields.nom_dept,
          population: element.fields.population,
          code_reg: element.fields.code_reg,
          nom_reg: element.fields.nom_reg,
          geo_point_2d: element.fields.geo_point_2d,
          code_dept: element.fields.code_dept,
          code_com: element.fields.code_com,
          geo_shape: {
            _type: element.fields.geo_shape.type,
            coordinatesMulti: element.fields.geo_shape.coordinates,
          },
          code_postal: element.fields.code_postal,
          superficie: element.fields.superficie,
          nom_com: element.fields.nom_com,
        },
        geometry: {
          _type: element.geometry.type,
          coordinates: element.geometry.coordinates
        }
      })
    } else {
      com = new Commune({
        _type: element.type,
        fields: {
          nom_dept: element.fields.nom_dept,
          population: element.fields.population,
          code_reg: element.fields.code_reg,
          nom_reg: element.fields.nom_reg,
          geo_point_2d: element.fields.geo_point_2d,
          code_dept: element.fields.code_dept,
          code_com: element.fields.code_com,
          geo_shape: {
            _type: element.fields.geo_shape.type,
            coordinates: element.fields.geo_shape.coordinates,
          },
          code_postal: element.fields.code_postal,
          superficie: element.fields.superficie,
          nom_com: element.fields.nom_com,
        },
        geometry: {
          _type: element.geometry.type,
          coordinates: element.geometry.coordinates
        }
      })
    }
       
      com.save(); 
      // console.log(element.geometry.type)
      // console.log(element.geometry.coordinates)
  }, this);
}

module.exports = addDepartements = () => {
  'use strict';

  let rawdata = fs.readFileSync('./model/dept.json');
  let departement = JSON.parse(rawdata);
  departement.features.forEach(function(element) {
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
  }, this);
}

module.exports = addRegion = function(){
  let rawdata = fs.readFileSync('./model/region.json');
  let region = JSON.parse(rawdata);
  region['features'].forEach(function(element) {
    var reg;
    if(element.geometry.type == 'MultiPolygon') {
      reg = new Region({
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
      reg = new Region({
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
      console.log("save done");
      reg.save(); 
  }, this);
  console.log("Finish");
}


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