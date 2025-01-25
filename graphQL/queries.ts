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



export const GET_NEWS = gql`
  query GetNews($limit: Int) {
    news(limit: $limit) {
      id
      title
      coverImage {
        publicId
        imgUrl
      }
      description
      author
      authorIds {
        profilePic {
          imgUrl
          publicId
        }
        firstName
        lastName
        id
      }
      league
      categories
      content
      createdAt
    }
  }
`;


export const LEAGUES = gql`
  query Leagues {
    leagues {
      id
      name
      logo {
        publicId
        imgUrl
      }
      country {
        imgPath
        value
      }
      description
      website
      socials {
        facebook
        instagram
        xlink
        youtube
      }
      backgroundGradient {
        fromColor
        toColor
      }
    }
  }
`;


export const HEADLINES = gql`
query NewsHeadlines {
  newsHeadlines {
    headlines {
      id
      coverImage {
        publicId
        imgUrl
      }
      description
      league
      sn
      title
      categories
    }
    id
  }
}
`;

export const NOTIFICATIONS = gql`
query List {
  notifications {
    list {
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
    recipient
  }
}
`;