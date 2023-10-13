import { ApolloClient, InMemoryCache } from '@apollo/client';



export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_PORT as string, 
  cache: new InMemoryCache(),
});