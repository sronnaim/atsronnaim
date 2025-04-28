import {
  AUTHENTICATE_USER_WITH_PASSWORD,
  type AuthenticateSuccessResponse,
} from "./auth.gql";
import { createClient } from "./client.server";

// Documentation visit https://keystonejs.com/docs/config/auth
export async function authenticateUserWithPassword(
  email: string,
  password: string,
) {
  const apollo = createClient();
  const { data } = await apollo.mutate({
    mutation: AUTHENTICATE_USER_WITH_PASSWORD,
    variables: {
      email,
      password,
    },
  });

  return data;
}

export const isAuthenticateSuccessResponse = (
  data: unknown,
): data is AuthenticateSuccessResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "authenticateUserWithPassword" in data &&
    typeof data["authenticateUserWithPassword"] === "object" &&
    data["authenticateUserWithPassword"] !== null &&
    "sessionToken" in data["authenticateUserWithPassword"]
  );
};
