// Import the gql tagged template function
const { gql } = require('apollo-server-express');

// Create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        reviews: [Review]
    }

    type Review {
        _id: ID
        reviewText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        reviews(username: String): [Review]
        review(_id: ID!): Review
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addReview(reviewText: String!): Review
        updateReview(reviewText: String!): Review
        deleteReview(reviewId: ID!): Review
        addReaction(reviewId: ID!, reactionBody: String!): Review
        addFriend(friendId: ID! ) User
    }
`;

module.exports = typeDefs;