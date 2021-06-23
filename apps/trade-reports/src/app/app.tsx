import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { TestItemForm, TestItemList } from '@trade-reports/feature-tests';
import './app.module.scss';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>Test Items</h1>
      <div className="flex">
        <TestItemForm />
        <TestItemList />
      </div>
    </ApolloProvider>
  );
};

export default App;