import { Welcome } from "../welcome/welcome";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getPosts } from "~/lib/graphql/post.server";
import { ensureClientSession } from "~/lib/graphql/utils.server";

export function meta() {
  return [
    { title: "@sronnaim" },
    { content: "Welcome to my personal website!" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { redirect, sessionToken } = await ensureClientSession(request);

  if (redirect) return redirect;

  const {
    data: { posts },
  } = await getPosts(
    {
      take: 3,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    },
    sessionToken,
  );

  return {
    posts,
  };
}

export default function Home() {
  const { posts } = useLoaderData();
  return <Welcome posts={posts} />;
}
