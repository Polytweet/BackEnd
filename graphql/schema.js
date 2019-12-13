const { gql } = require('apollo-server');


const typeDefs = gql`

    scalar Date

    type News {
        _id: String,
        source: String,
        author: String,
        title: String,
        description: String,
        url: String,
        date: Date,
        content: String
    }

    type GeoTweet {
        city: String
        cityCode: String
        departmentCode: String
        regionCode: String 
    }

    type Tweet {
        _id: String
        hashtag: [String]
        geoTweet: GeoTweet
        text: String
        createdat: Date
        checked: Boolean
    }

    type MatchingTN {
        _id: String
        news: String
        tweet: String
        percentage: Float
        algorithmUsed: String
    }

    type GeoShape {
        _type: String
        coordinates: [ [ [ Float ] ] ]
        coordinatesMulti: [ [ [ [ Float ] ] ] ]
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

    type Properties {
        code: String
        nom: String
    }
    type Departement {
        type: String
        properties: Properties
        geometry: GeoShape
    }
    type Region {
        type: String
        properties: Properties
        geometry: GeoShape
    }

    type TopHashtag {
        _id: String!
        count: Int
    }

    type HashtagFromSet {
        hashtag: String
        count: Int
    }
    type SetOfTopHastags {
        _id: String
        hashtags: [HashtagFromSet]
        count: Int
    }
    
    type Query {
        communes(code_dept:String, nom_dept:String): [Communes]
        departements: [Departement]
        regions: [Region]
        news: [News]
        tweets: [Tweet] @deprecated(reason: "Please use tweetsFromFrance instead")
        tweetsFromFrance: [Tweet]
        tweetsFromCity(cityCode: String): [Tweet]
        tweetsFromDepartement(depCode: String): [Tweet]
        tweetsFromRegion(regCode: String): [Tweet]
        topHashtagsFromFrance: [TopHashtag]
        topHashtagsFromCity(cityCode: String): [TopHashtag]
        topHashtagsFromDepartement(depCode: String): [TopHashtag]
        topHashtagsFromRegion(regCode: String): [TopHashtag]
        numberOfTweetsPerDayFromFrance: Float
        numberOfTweetsPerDayFromRegion(regCode: String): Float
        numberOfTweetsPerDayFromDepartement(depCode: String): Float
        numberOfTweetsPerDayFromCity(cityCode: String): Float
        totalNumberOfTweetsUsedByPolytweet: Int
        topHashtagsFromAllRegions: [SetOfTopHastags]
        topHashtagsFromAllDepartementsInOneRegion(regCode: String): [SetOfTopHastags]
        topHashtagsFromAllCitiesInOneDepartement(depCode: String): [SetOfTopHastags]
        tweetsPerDayFromAllRegions: [TopHashtag]
        tweetsPerDayFromAllDepartements: [TopHashtag]
        tweetsPerDayFromAllCitiesInOneDepartement(depCode: String): [TopHashtag]
        matchingTN: [MatchingTN]
    }`
;

module.exports = typeDefs;