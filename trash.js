// --------------------------------------------------------------------------------------------
// Test ajout coordonnées pour map 

const Booking = require('./model/commune');

jsonInput = () => {
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

  // let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/fr-communes2016.json');
  let communes = JSON.parse(rawdata);
  communes.forEach(function(element) {
      // delete element.fields.id_geofla;
      // delete element.fields.insee_com;
      // delete element.fields.x_chf_lieu;
      // delete element.fields.y_chf_lieu;
      // delete element.fields.y_centroid;
      // delete element.fields.statut;
      // delete element.fields.z_moyen;
      // delete element.fields.x_centroid;
      // delete element.fields.code_arr;
      // delete element.record_timestamp;
      // delete element.datasetid;
      // delete element.recordid;
      // console.log('test '+element.fields.geo_shape.coordinates);
      let com = new Commune({
        fields: {
          nom_dept: element.fields.nom_dept,
          population: element.fields.population,
          code_reg: element.fields.code_reg,
          nom_reg: element.fields.nom_reg,
          geo_point_2d: element.fields.geo_point_2d,
          code_dept: element.fields.code_dept,
          code_com: element.fields.code_com,
          geo_shape: {
            _type: element.fields.geo_shape.type,
            coordinates: element.fields.geo_shape.coordinates
          },
          code_postal: element.fields.code_postal,
          superficie: element.fields.superficie,
          nom_com: element.fields.nom_com
        },
        geometry: {
          _type: element.geometry.type,
          coordinates: element.geometry.coordinates
        }
      })
      com.save();
      // console.log('-------------------')
  }, this);
}

// jsonObject = jsonInput();



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