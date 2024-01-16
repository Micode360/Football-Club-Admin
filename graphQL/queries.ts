import { gql } from "@apollo/client";

const userInfoFragment = gql`
  fragment UserInfoFragment on User {
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
`;

export const AUTHORIZED_ACCESS = gql`
  query {
    authorizedAccess
  }
`;

export const USER_INFO = gql`
  query {
    user {
      ...UserInfoFragment
    }
  }
  ${userInfoFragment}
`;

export const USERS_INFO = gql`
  query {
    users {
      ...UserInfoFragment
    }
  }
  ${userInfoFragment}
`;
