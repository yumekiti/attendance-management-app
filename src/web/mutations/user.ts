import { gql } from "@apollo/client";

export const createUserMutation = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      school_number
      username
      class_name
      attendance_number
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      school_number
      username
      class_name
      attendance_number
    }
  }
`;
