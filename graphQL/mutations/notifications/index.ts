import { gql } from "@apollo/client";

export const SEND_NOTIFICATION = gql`
  mutation Mutation($input: NotificatonInput!) {
    SendNotification(input: $input) {
      success
      status
      message
    }
  }
`;

export const MARK_NOTIFICATION = gql`
  mutation Mutation($input: notificationProps!) {
    MarkNotificationAsRead(input: $input) {
      success
      status
      message
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation Mutation($input: notificationProps!) {
    DeleteNotification(input: $input) {
      success
      status
      message
    }
  }
`;
