import { gql } from "@apollo/client/index.js";

export type AuthenticateVariables = {
  email: string;
  password: string;
};

export type AuthenticateSuccessResponse = {
  authenticateUserWithPassword: {
    item: {
      isAdmin: boolean;
      email: string;
      name: string;
    };
    sessionToken: string;
  };
};

export type AuthenticateErrorResponse = {
  authenticateUserWithPassword: {
    message: string;
  };
};

export const AUTHENTICATE_USER_WITH_PASSWORD = gql`
  mutation Mutation($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          isAdmin
          email
          name
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;
