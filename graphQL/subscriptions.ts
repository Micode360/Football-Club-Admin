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

export const NEW_NOTIFICATION = gql`
  subscription NewNotification {
    newNotification {
      id
      type
      sender
      senderProfilePic
      message
      action {
        path
      }
      isRead
      createdAt
    }
  }
`;

export const RESPONSE_SUBSCRIPTION = gql`
  subscription Response {
    response {
      message
    }
  }
`;


export const NEWS_SUBCRIPTION_UPDATE = gql`
    subscription NewsUpdate {
      newsUpdate {
        id
        title
        coverImage {
          publicId
          imgUrl
        }
        description
        author
        authorIds {
          firstName
          lastName
          id
          profilePic {
            publicId
            imgUrl
          }
        }
        league
        categories
        content
        createdAt
      }
    }
`;
