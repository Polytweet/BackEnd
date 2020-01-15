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
        newsAboutIt: [String]
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

    type NumerOfTweetsFromZone {
        _id: String!
        count: Float
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
        last10tweets: [Tweet]
        tweetsFromCity(cityCode: String, newsId: [String] = []): [Tweet]
        tweetsFromDepartement(depCode: String, newsId: [String] = []): [Tweet]
        tweetsFromRegion(regCode: String, newsId: [String] = []): [Tweet]
        topHashtagsFromFrance(newsId: [String] = []): [TopHashtag]
        topHashtagsFromCity(cityCode: String, newsId: [String] = []): [TopHashtag]
        topHashtagsFromDepartement(depCode: String, newsId: [String] = []): [TopHashtag]
        topHashtagsFromRegion(regCode: String, newsId: [String] = []): [TopHashtag]
        numberOfTweetsPerDayFromFrance(newsId: [String] = []): Float
        numberOfTweetsPerDayFromRegion(regCode: String, newsId: [String] = []): Float
        numberOfTweetsPerDayFromDepartement(depCode: String, newsId: [String] = []): Float
        numberOfTweetsPerDayFromCity(cityCode: String, newsId: [String] = []): Float
        totalNumberOfTweetsUsedByPolytweet: Int
        topHashtagsFromAllRegions(newsId: [String] = []): [SetOfTopHastags]
        topHashtagsFromAllDepartements(newsId: [String] = []): [SetOfTopHastags]
        topHashtagsFromAllDepartementsInOneRegion(regCode: String, newsId: [String] = []): [SetOfTopHastags]
        topHashtagsFromAllCitiesInOneDepartement(depCode: String, newsId: [String] = []): [SetOfTopHastags]
        tweetsPerDayFromAllRegions(newsId: [String] = []): [NumerOfTweetsFromZone]
        tweetsPerDayFromAllDepartements(newsId: [String] = []): [NumerOfTweetsFromZone]
        tweetsPerDayFromAllCitiesInOneDepartement(depCode: String, newsId: [String] = []): [NumerOfTweetsFromZone]
        matchingTN: [MatchingTN]
    }
    
    type Subscription {
        totalNumberOfTweetsUsedByPolytweet: Int
        last10tweets: [Tweet]
    }

    `
;

module.exports = typeDefs;