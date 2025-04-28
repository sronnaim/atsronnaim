import { CommandLine } from "~/components/command-line";
import { Blogs as BlogsList } from "~/components/blogs";
import type { Post } from "~/lib/graphql/post.gql";

export function Blogs({ posts }: { posts: Post[] }) {
  return (
    <section>
      <CommandLine
        command="ls -lt"
        location="~/blogs"
        ariaLabel="Latest blogs"
      />
      <BlogsList posts={posts} />
    </section>
  );
}
