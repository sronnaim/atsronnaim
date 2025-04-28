import { ensureClientSession } from "~/lib/graphql/utils.server";
import type { Route } from "../projects/+types/home";
import { getProjects } from "~/lib/graphql/project.server";
import { useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import type { Project } from "~/lib/graphql/project.gql";
import { CommandLine } from "~/components/command-line";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { renderers } from "~/components/renderers";

export function meta() {
  const title = `projects | @sronnaim`;

  return [{ title }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { redirect, sessionToken } = await ensureClientSession(request);
  if (redirect) return redirect;

  const { projects } = await getProjects(sessionToken);

  return {
    projects,
  };
}

export default function Projects() {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <ul>
      <CommandLine
        aria-hidden
        location="~/projects"
        command="ls"
        ariaLabel="Projects"
      />
      {projects.map((p, i) => {
        return (
          <li key={i} className="my-20">
            <ProjectBlock project={p} />
          </li>
        );
      })}
    </ul>
  );
}

function ProjectBlock({
  project: { demoUrl, githubUrl, name, image, content, stacks },
}: {
  project: Project;
}) {
  return (
    <article className="flex flex-col-reverse items-center md:flex-row md:max-h-300 md:items-stretch gap-4">
      <div className="flex flex-col md:justify-between">
        <h2 className="font-bold">{name}</h2>
        <div className="md:grow overflow-auto">
          <DocumentRenderer document={content.document} renderers={renderers} />
        </div>
        <p>
          <span
            className="font-symbols inline-flex translate-y-4 scale-125 text-rose-500"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {"stacks"}
          </span>
          {"  " + stacks}
        </p>
        <div className="flex bg-accent">
          {githubUrl && (
            <Button asChild className="rounded-none p-20 flex-1" variant="link">
              <a href={githubUrl}>{"View code"}</a>
            </Button>
          )}
          {demoUrl && (
            <Button
              asChild
              className="rounded-none py-20 flex-1"
              variant="link"
            >
              <a href={demoUrl}>{"See it live"}</a>
            </Button>
          )}
        </div>
      </div>
      <figure className="shrink-0">
        <img
          className="w-300 h-300 object-cover"
          src={
            (image && image.publicUrl) ||
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
          }
        />
      </figure>
    </article>
  );
}
