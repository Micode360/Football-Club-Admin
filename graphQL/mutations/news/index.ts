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
