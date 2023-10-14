import { gql } from "@apollo/client";

// export const LOGIN_MUTATION = gql`
//   mutation Login {
//     // ...
//   }
// `;

export const REGISTER_MUTATION = gql`
  mutation RegisterUser($input: UserInput!) {
    Register(input: $input) {
      success
      status
      message
    }
  }
`;
