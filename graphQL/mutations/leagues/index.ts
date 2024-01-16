import { gql } from "@apollo/client";

export const ADD_LEAGUE = gql`
    mutation Mutation($input: LeagueInput!) {
    AddLeague(input: $input) {
      success
      status
      message
    }
  }
`;


export const EDIT_LEAGUE = gql`
    mutation EditLeague($input: LeagueInput!) {
      EditLeague(input: $input) {
        success
        status
        message
      }
    }
`;


export const DELETE_LEAGUE = gql`
    mutation Mutation($input: Delete!) {
      DeleteLeague(input: $input) {
        success
        status
        message
      }
    }
`;
