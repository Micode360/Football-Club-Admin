import { gql } from "@apollo/client";

export const ADD_NEWS = gql`
  mutation Mutation($input: NewsInput!) {
    AddNews(input: $input) {
      success
      status
      message
      value
    }
  }
`;

export const EDIT_NEWS = gql`
  mutation Mutation($input: NewsInput!) {
    AddNews(input: $input) {
      success
      status
      message
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation DeleteNews($input: Delete!) {
    DeleteNews(input: $input) {
      success
      status
      message
    }
  }
`;


export const HEADLINES_NEWS = gql`
    mutation Mutation($input: NewsHeadline!) {
      UpdateNewsHeadlines(input: $input) {
        success
        status
        message
      }
    }
`;

export const HANDLE_ACCESS = gql`
    mutation Mutation($input: HandleAccess!) {
      HandleAccess(input: $input) {
        message
        status
        success
      }
    }
`;
