import { gql } from "@apollo/client/index.js";

export type Project = {
  content: Record<string, unknown>;
  image: {
    publicUrl: string;
  } | null;
  name: string;
  stacks: string;
  demoUrl: string | null;
  githubUrl: string | null;
};

export type GetProjectsQueryVariables = {
  where?: {
    id?: {
      equals: string | null;
    };
    githubUrl?: {
      contains: string | null;
    };
    demoUrl: {
      contains: string | null;
    };
    name: {
      contains: string | null;
    };
    stacks: {
      contains: string | null;
    };
  };
};

const projectFields = `
  projects {
    demoUrl
    githubUrl
    content {
      document
    }
    image {
      publicUrl
    }
    name
    stacks
  }
`;

export const GET_PROJECTS = gql`
    query Projects {
        ${projectFields}
    }    
`;
