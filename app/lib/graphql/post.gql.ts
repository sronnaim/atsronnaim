import { gql } from "@apollo/client/index.js";
import type { Element } from "~/components/keystone/type";

export type Post = {
  author: {
    email: string;
    name: string;
    id: string;
  };
  content: {
    document: Element[];
  };
  createdAt: string;
  lastUpdated: string;
  id: string;
  title: string;
  slug: string;
  viewCount: number;
};

const postFields = `
    author {
        email
        name
        id
    }
    content {
        document
    }
    createdAt
    lastUpdated
    id
    title
    slug
    viewCount
`;

export type GetPostQueryVariables = {
  slug?: string;
  id?: string;
};

export type GetPostsQueryVariables = {
  where?: {
    author?: {
      email?: {
        contains: string | null;
      };
      name?: {
        contains: string | null;
      };
    };
    title?: {
      contains: string | null;
    };
  };
  orderBy?: {
    [key: string]: "asc" | "desc";
  }[];
  take?: number;
};

export type PostsResponse = {
  posts: Post[];
};

export type UpdatePostData = {
  author?: {
    connect: {
      email: string;
      id: string;
    };
  };
  content?: unknown;
  slug?: string;
  tags?: {
    set?: {
      id: string;
    };
  };
  title?: string;
  viewCount?: number;
};

export const GET_POST = gql`
  query Post($where: PostWhereUniqueInput!) {
      post(where: $where) {
          ${postFields}
      }
  }
`;

export const SEARCH_POSTS = gql`
  query Posts($where: PostWhereInput!, $orderBy: [PostOrderByInput!]!, $take: Int) {
      posts(where: $where, orderBy: $orderBy, take: $take) {
          ${postFields}
      }
  }
`;

export const GET_POSTS = gql`
  query Posts($orderBy: [PostOrderByInput!]!, $take: Int) {
      posts(orderBy: $orderBy, take: $take) {
          ${postFields}
      }
  }
`;

export const MUTATE_POST = gql`
  mutation UpdatePost($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    updatePost(where: $where, data: $data) {
      ${postFields}
    }
  }
`;
