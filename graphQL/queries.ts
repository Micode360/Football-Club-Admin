import { gql } from "@apollo/client";

export const AUTHORIZED_ACCESS = gql`
  query Query {
    authorizedAccess
  }
`;

export const GET_SOME_DATA = gql`
  query ExampleQuery {
    user {
      id
      firstName
      lastName
      email
    }
  }
`;
