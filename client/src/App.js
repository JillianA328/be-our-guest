import React from 'react';
import { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Axios from "axios";

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile'

//added for API
import Searchrest from './pages/SearchRest'
import { QueryDocumentKeys } from 'graphql/language/visitor';



const httpLink = createHttpLink({
  //new link to graphql server with graphql endpoint
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


//adding documenu api
function App() {
  const [query, setquery] = useState("")
  var url = 'https://api.documenu.com/v2/restaurant/4072702673999819?key=bc07f64299960a8b13f9a3d3e07ebf52'

  async function getRestauraunts() {
    var result = await Axios.get(url);
    console.log(result.data);
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">

            <h1 onClick={getRestauraunts}> Enter Restaurant Name </h1>
            <form className="search" onSubmit={onSubmit}>
              <input type="test" placeholder="enter name"
                value={query} onChange={(e) => setquery(e.target.value)}
              />
            </form>


            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
              {/* <Route exact path="/serach" component={Searchrest} /> */}
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider >
  );
}

export default App;