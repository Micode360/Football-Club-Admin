import { gql } from "@apollo/client";

export const USER_UPDATED = gql`
subscription userSubscription {
  user {
    id
    firstName
    lastName
    email
    country {
      imgPath
      value
    }
    state
    city
    zipCode
    profilePic {
      publicId
      imgUrl
    }
  }
}
`;


export const RESPONSE_SUBSCRIPTION = gql`
subscription Response {
  response {
    message
  }
}`;
