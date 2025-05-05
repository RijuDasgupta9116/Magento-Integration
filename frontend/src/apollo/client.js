import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://preprod.mynestle.in/graphql', // Replace with your Magento GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
