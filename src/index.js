import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://excited-sole-34.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'secret'
  },
  cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </ApolloProvider>
,
    document.getElementById("root")
);

