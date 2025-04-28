import { ensureClientSession } from "~/lib/graphql/utils.server";
import type { Route } from "../projects/+types/home";
import { getProjects } from "~/lib/graphql/project.server";
import { useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import type { Project } from "~/lib/graphql/project.gql";
import { CommandLine } from "~/components/command-line";

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
  project: { demoUrl, githubUrl, name, image },
}: {
  project: Project;
}) {
  return (
    <article className="flex justify-between gap-4">
      <div className="grow flex flex-col">
        <h2 className="h-max grow">{name}</h2>
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
      <figure>
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
