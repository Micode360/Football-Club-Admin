import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    Login(input: $input) {
      status
      accessToken
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation RegisterUser($input: UserInput!) {
    Register(input: $input) {
      success
      status
      message
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($input: ForgotPassword!) {
    ForgotPassword(input: $input) {
      message
      status
      success
      value
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation Mutation($input: ChangePassword!) {
    ChangePassword(input: $input) {
      message
      status
      success
      value
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($input: UserInput!) {
    UpdateUser(input: $input) {
      message
      status
      success
      value
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($input: Delete!) {
    DeleteUser(input: $input) {
      message
      status
    }
  }
`;
