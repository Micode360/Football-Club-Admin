import { gql } from "@apollo/client";

export const AUTHORIZED_ACCESS = gql`
  query Query {
    authorizedAccess
  }
`;

export const USER_INFO = gql`
  query ExampleQuery {
    user {
      id
      firstName
      lastName
      email
      profilePic {
        imgUrl
        publicId
      }
      country {
        imgPath
        value
      }
      role
      state
      city
      zipCode
    }
  }
`;

export const USERS_INFO = gql`
  query ExampleQuery {
    users {
      id
      firstName
      lastName
      email
      profilePic {
        imgUrl
        publicId
      }
      country {
        imgPath
        value
      }
      role
      state
      city
      zipCode
      createdAt
    }
  }
`;
