const { gql } = require('apollo-server');

const typeDefs = gql`

    type GeoShape {
        _type: String
        coordinates: [ [ [ Float ] ] ]
    }
    type CommuneFields {
        nom_dept: String
        population: Float
        code_reg: String
        nom_reg: String
        geo_point_2d: [Float]
        code_dept: String
        code_com: String
        geo_shape: CommuneGeometry
        code_postal: String
        superficie: Float
        nom_com: String
    }
    type CommuneGeometry {
        _type: String
        coordinates: [Float]
    }
    type Communes {
        type: String
        fields: CommuneFields
        geometry: GeoShape
    }

    type DepartementProperties {
        code: String
        nom: String
    }
    type DepartementGeometry {
        _type: String
        coordinates: [ [ [ Float ] ] ]
        coordinatesMulti: [ [ [ [ { type: Number } ] ] ] ]
    }
    type Departement {
        type: String
        properties: DepartementProperties
        geometry: DepartementGeometry
    }

    type Query {
        communes(code_dept:String): [Communes]
    }
`;

module.exports = typeDefs;