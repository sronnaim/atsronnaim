import { createClient } from "./client.server";
import {
  GET_POST,
  GET_POSTS,
  MUTATE_POST,
  SEARCH_POSTS,
  type GetPostsQueryVariables,
  type GetPostQueryVariables,
  type UpdatePostData,
  type Post,
} from "./post.gql";
import { isPost } from "./utils.server";

export async function getPostBySlug(slug: string, token: string) {
  const apollo = createClient(token);
  const where: GetPostQueryVariables = {
    slug,
  };
  const { data } = await apollo.query<{ post: Post }>({
    query: GET_POST,
    variables: {
      where,
    },
  });

  return data;
}

export async function getPosts(
  {
    orderBy = [{ createdAt: "desc" }],
    take = 50,
    ...vars
  }: Omit<GetPostsQueryVariables, "where">,
  token: string,
) {
  const apollo = createClient(token);
  const data = await apollo.query<{ posts: Post[] }>({
    query: GET_POSTS,
    variables: {
      orderBy,
      take,
      ...vars,
    },
  });

  return data;
}

export async function searchPosts(vars: GetPostsQueryVariables, token: string) {
  const apollo = createClient(token);
  const { data } = await apollo.query<{ posts: Post[] }>({
    query: SEARCH_POSTS,
    variables: vars,
  });

  return data;
}

export async function updateViewCountBySlug(
  {
    slug,
  }: {
    slug: string;
  },
  token: string,
) {
  const apollo = createClient(token);

  const { post } = await getPostBySlug(slug, token);

  if (!post && typeof post !== "object" && !isPost(post)) return null;

  const where: GetPostQueryVariables = {
    slug,
  };

  const updateData: UpdatePostData = {
    viewCount: post.viewCount + 1,
  };

  const { data } = await apollo.mutate<{ updatePost: Post }>({
    mutation: MUTATE_POST,
    variables: {
      data: updateData,
      where,
    },
  });

  return data;
}
