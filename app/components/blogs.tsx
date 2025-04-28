import { Link } from "react-router";
import type { Post } from "~/lib/graphql/post.gql";

export function Blogs({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((p, i) => (
        <li key={i}>
          <BlogAnchor
            title={p.title}
            date={new Date(p.createdAt)}
            slug={p.slug}
          />
        </li>
      ))}
    </ul>
  );
}

export function BlogAnchor({
  title,
  date,
  slug,
}: {
  title: string;
  date: Date;
  slug: string;
}) {
  return (
    <Link
      className="whitespace-pre-wrap"
      to={`/blogs/${slug}`}
      aria-label={`${title} ${date.toDateString()}`}
    >
      {`${date.toDateString()}\t${title}`}
    </Link>
  );
}
