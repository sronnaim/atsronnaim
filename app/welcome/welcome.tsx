import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { type Post } from "~/lib/graphql/post.gql";
import { CommandLine } from "~/components/command-line";
import { Blogs } from "~/components/blogs";
import { Link } from "react-router";

export function Welcome({ posts }: { posts: Post[] }) {
  return (
    <>
      <section className="w-full">
        <CommandLine command="whoami" ariaLabel="About me" />
        <WhoAmI />
      </section>
      <nav className="w-full">
        <CommandLine command="ls -d */" ariaLabel="Links" />
        <Links />
      </nav>
      <section>
        {/* Hydrate this */}
        <CommandLine
          command="ls blogs -lt | head -n 3"
          ariaLabel="Latest blogs"
        />
        <Blogs posts={posts} />
      </section>
      <section>
        <CommandLine command="cat socials.md" ariaLabel="Socials" />
        <Socials socials={socials} />
      </section>
      <footer>
        <CommandLine command="cat gratitude.md" ariaLabel="Special thanks" />
        <p>
          {"Special thanks to "}
          <Button asChild variant="link" className="text-base">
            <a href="https://zoch.dev/">zoch.dev</a>
          </Button>
          {" for awesome design insipiration."}
        </p>
      </footer>
    </>
  );
}

function WhoAmI() {
  return (
    <p className="flex flex-col">
      <span>
        <span
          className="font-symbols inline-flex scale-125 text-violet-400"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {"person"}
        </span>
        <span className="text-violet-400">{` User:`}</span>
        <span>{` Yusron`}</span>
      </span>
      <span>
        <span
          className="font-symbols inline-flex translate-y-1 scale-125 text-rose-400"
          style={{ fontVariationSettings: "'wght' 600" }}
        >
          {"fingerprint"}
        </span>
        <span className="text-rose-400">{` About:`}</span>
        <span>{` Will build for the fun of it. Currently teaching programming to kids.`}</span>
      </span>
      <span>
        <span
          className="font-symbols inline-flex translate-y-1 scale-125 text-teal-500"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {"stacks"}
        </span>
        <span className="text-teal-500">{` Stacks:`}</span>
        <span>{` TypeScript | express | React | react-router | Tailwind CSS | PostgreSQL`}</span>
      </span>
    </p>
  );
}

function Links() {
  return (
    <ul className="flex gap-20">
      <li>
        <MyLink href="blogs" label="blogs/" ariaLabel="blogs" />
      </li>
      <li>
        <MyLink href="projects" label="projects/" ariaLabel="projects" />
      </li>
    </ul>
  );
}

function MyLink({
  ariaLabel,
  href,
  label,
}: {
  ariaLabel?: string;
  href: string;
  label: string;
}) {
  return (
    <Button
      asChild
      variant="link"
      aria-label={ariaLabel}
      className="text-blue-900 font-semibold"
    >
      <Link to={href}>{label}</Link>
    </Button>
  );
}

function Socials({
  socials,
}: {
  socials: {
    label: string;
    href: string;
    className?: string;
  }[];
}) {
  return (
    <ul>
      {socials.map((s, i) => {
        return (
          <li key={i}>
            <SocialAnchor
              href={s.href}
              label={s.label}
              className={s.className}
            />
          </li>
        );
      })}
    </ul>
  );
}

function SocialAnchor({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <span className="group">
      {`- [`}
      <Button asChild variant="link" className={cn("p-0", className)}>
        <a href={href} aria-label={label}>
          {label}
        </a>
      </Button>
      {`]`}
      <Button
        aria-hidden
        asChild
        variant="link"
        className="hidden group-hover:inline"
      >
        <a href={href}>{`(${href})`}</a>
      </Button>
    </span>
  );
}

const socials = [
  {
    href: "https://github.com/sronnaim",
    label: "GitHub",
    className: "text-black dark:text-white",
  },
  {
    href: "https://www.linkedin.com/in/yusronnaim",
    label: "LinkedIn",
    className: "text-blue-700",
  },
];
