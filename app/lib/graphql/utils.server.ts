import { redirect } from "react-router";
import { clientSession } from "~/sessions.server";
import { authenticateClient } from "./client.server";
import type { Post } from "./post.gql";

export function createSessionContextCookie(token: string) {
  return `keystonejs-session=${token}`;
}

export async function ensureClientSession(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const session = await clientSession.getSession(cookieHeader);

  if (!session.has("client-session")) {
    const data = await authenticateClient();

    session.set(
      "client-session",
      data.authenticateUserWithPassword.sessionToken,
    );
    const setCookie = await clientSession.commitSession(session);

    return {
      redirect: redirect(new URL(request.url).pathname, {
        headers: {
          "Set-Cookie": setCookie,
        },
      }),
      sessionToken: session.get("client-session") as string,
    };
  }

  const sessionToken = session.get("client-session") as string;

  return { sessionToken };
}

export function isPost(obj: unknown): obj is Post {
  if (typeof obj !== "object" || obj === null) return false;

  const post = obj as Record<string, unknown>;

  return (
    typeof post.id === "string" &&
    typeof post.title === "string" &&
    typeof post.slug === "string" &&
    typeof post.createdAt === "string" &&
    typeof post.lastUpdated === "string" &&
    typeof post.viewCount === "number" &&
    typeof post.content === "object" &&
    post.content !== null &&
    typeof post.author === "object" &&
    post.author !== null &&
    "id" in post.author &&
    "email" in post.author &&
    "name" in post.author &&
    typeof post.author.id === "string" &&
    typeof post.author.email === "string" &&
    typeof post.author.name === "string"
  );
}
