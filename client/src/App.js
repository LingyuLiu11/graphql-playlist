import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-boost';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

export default function App() {
  
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>Ninja's Reading List</h1>
                <BookList />
                <AddBook></AddBook>
            </div>
        </ApolloProvider>
    );
  
}

