import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Blogs } from "~/blogs/blogs";
import { getPosts } from "~/lib/graphql/post.server";
import { ensureClientSession } from "~/lib/graphql/utils.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { redirect, sessionToken } = await ensureClientSession(request);
  if (redirect) return redirect;

  const {
    data: { posts },
  } = await getPosts({ take: 10 }, sessionToken);

  return {
    posts,
  };
}

export default function Home() {
  const { posts } = useLoaderData();

  return (
    <>
      <Blogs posts={posts} />
    </>
  );
}
