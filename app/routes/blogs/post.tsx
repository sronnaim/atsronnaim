import { ensureClientSession } from "~/lib/graphql/utils.server";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import {
  getPostBySlug,
  updateViewCountBySlug,
} from "~/lib/graphql/post.server";
import type { Route } from "./+types/post";
import type { Post } from "~/lib/graphql/post.gql";
import { CommandLine } from "~/components/command-line";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { componentBlocksRenderer, renderers } from "~/components/renderers";

const isOnProduction = process.env.NODE_ENV === "production";

export function meta({ data }: Route.MetaArgs) {
  const title = `${data.post?.title || "Untitled"} | @sronnaim`;

  return [{ title }];
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { redirect, sessionToken } = await ensureClientSession(request);
  if (redirect) return redirect;

  let post: Post | null | undefined = null;

  if (isOnProduction) {
    const response = await updateViewCountBySlug(
      { slug: params.slug! },
      sessionToken,
    );

    if (response) post = response.updatePost;
  } else {
    const { post: postData } = await getPostBySlug(params.slug!, sessionToken);
    post = postData;
  }

  return {
    post,
  };
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  if (!post)
    return (
      <section role="alert">
        <CommandLine variant="danger" ariaLabel="Post not found" />
        <p aria-hidden>Post not found</p>
      </section>
    );
  else
    return (
      <>
        <section>
          <CommandLine
            as="h2"
            location={`~/blogs/${post.slug}`}
            command={`cat info.md`}
            ariaLabel="Post info"
            aria-hidden
          />
          <h2 className="text-4xl py-22">
            <span className="text-foreground/50" aria-hidden>
              {"# "}
            </span>
            <span>{post.title}</span>
          </h2>
          <p>
            {"Last updated on "}
            {new Date(post.createdAt).toDateString()}
          </p>
          <p className="text-sm">{`By ${post.author.name}`}</p>
          <p>{`${post.viewCount} views`}</p>
        </section>
        <article>
          <CommandLine
            as="h3"
            location={`~/blogs/${post.slug}`}
            command={`glow content.md`}
            ariaLabel="Post content"
          />
          <DocumentRenderer
            document={post.content.document}
            renderers={renderers}
            componentBlocks={componentBlocksRenderer}
          />
        </article>
      </>
    );
}
