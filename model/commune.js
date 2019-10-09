const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

// jsonInput = () => {
//     'use strict';

//     let rawdata = fs.readFileSync('/home/polytweetlyon/server/model/result1.json');
//     let communes = JSON.parse(rawdata);
//     let array = [];
//     communes.forEach(function(element) {
//         delete element.fields.id_geofla;
//         delete element.fields.insee_com;
//         delete element.fields.x_chf_lieu;
//         delete element.fields.y_chf_lieu;
//         delete element.fields.y_centroid;
//         delete element.fields.statut;
//         delete element.fields.z_moyen;
//         delete element.fields.x_centroid;
//         delete element.fields.code_arr;
//         delete element.record_timestamp;
//         delete element.datasetid;
//         delete element.recordid;
//         console.log(element);
//         array.push(element)
//     }, this);
//     return array
// }

// jsonObject = jsonInput();

// console.log(JSON.stringify(jsonObject))

// var GenerateSchema = require('generate-schema')
// var schema = GenerateSchema.json('Product',jsonObject);

// console.log(schema)

const commune = new Schema({
  fields: {
    nom_dept: String,
    population: Number,
    code_reg: String,
    nom_reg: String,
    geo_point_2d: [Number],
    code_dept: String,
    code_com: String,
    geo_shape: {
        _type: String,
        coordinates: [ [ [ { type: Number } ] ] ]
    },
    code_postal: String,
    superficie: Number,
    nom_com: String
  },
  geometry: {
    _type: String,
    coordinates: [ { type: Number } ]
  }
});

module.exports = mongoose.model('Commune', commune);