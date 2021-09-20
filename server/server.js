const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

// //yelp api
// 'use strict';
// const yelp = require('yelp-fusion');
// const apiKey = '<rBXdXPcoa2B-XASARjXsQWYdly4k_XIDr7zCBB_mhF9pSSooY0jpj3yumdeEdY3JFUUy3hJnM2xHZ4p-dpi8HIQbPZvoPmA3kHBiduN7TZ2ITT7V7HbOkJiGTjZBYXYx>';

// const searchRequest = {
//     term: 'Four Barrel Coffee',
//     location: 'san francisco, ca'
// };

// const client = yelp.client(apiKey);

// client.search(searchRequest).then(response => {
//     const firstResult = response.jsonBody.businesses[0];
//     const prettyJson = JSON.stringify(firstResult, null, 4);
//     console.log(prettyJson);
// }).catch(e => {
//     console.log(e);
// });


server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
