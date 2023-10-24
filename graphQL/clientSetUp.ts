import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from "../utils/utilsFunctions";


const httpLink = createHttpLink({
  uri: 'http://localhost:5000/api/main',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getToken('asstkn');

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  credentials: 'include',
  cache: new InMemoryCache(),
});


