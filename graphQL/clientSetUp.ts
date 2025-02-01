import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../utils/utilsFunctions";


const accessToken = getToken("asstkn");

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_PORT,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://manage.theleague.micode360.com/graphql',
  connectionParams: {
    authToken: accessToken,
  },
}));

const authLink = setContext((_, { headers }) => {


  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  credentials: "include",
  cache: new InMemoryCache(),
});
