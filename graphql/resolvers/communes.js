const Commune = require('../../model/commune');

module.exports = {
    Query: {
        communes: async (parent, args, context) => {
          try {
            const result = await Commune.find({ 'fields.code_dept': args.code_dept });
            return result.map(commune => {
              return {
                type: "Feature",
                fields: {
                  nom_dept: commune.fields.nom_dept,
                  population: commune.fields.population,
                  code_reg: commune.fields.population,
                  nom_reg: commune.fields.nom_reg,
                  geo_point_2d: commune.fields.geo_point_2d,
                  code_dept: commune.fields.code_dept,
                  code_com: commune.fields.code_com,
                  geo_shape: {
                    _type: commune.geometry._type,
                    coordinates: commune.geometry.coordinates,
                  },
                  code_postal: commune.fields.code_postal,
                  superficie: commune.fields.superficie,
                  nom_com: commune.fields.nom_com,
                },
                geometry: {
                  _type: commune.fields.geo_shape._type,
                  coordinates: commune.fields.geo_shape.coordinates
                }     
              }
            })
          } catch (err) {
            throw err;
          }
        }
      },
};