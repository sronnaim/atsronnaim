import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/index.js";
import {
  authenticateUserWithPassword,
  isAuthenticateSuccessResponse,
} from "./auth.server";
import { ENV } from "../env";
import { createSessionContextCookie } from "./utils.server";

export function createClient(token?: string) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: ENV.KEYSTONE_GRAPHQL_API_URL,
      credentials: "include",
      headers: token
        ? {
            cookie: createSessionContextCookie(token),
          }
        : undefined,
    }),
    ssrMode: true,
  });
}

export async function authenticateClient() {
  const data = await authenticateUserWithPassword(
    ENV.CLIENT_EMAIL,
    ENV.CLIENT_SECRET,
  );

  if (!isAuthenticateSuccessResponse(data))
    throw new Error("Invalid client credentials");

  return data;
}
