import { Link } from "react-router";
import { Button } from "./ui/button";
import { Theme } from "remix-themes";

export function Navbar({
  themeToggleFn,
  theme,
}: {
  themeToggleFn: () => void;
  theme: Theme | null;
}) {
  return (
    <nav className="w-full sticky top-0 justify-between py-10 backdrop-blur-2xl bg-linear-to-t from-background/1 to-background/10 z-50">
      <span className="flex w-3/4 sm:w-2/3 max-w-2xl justify-between items-center m-auto">
        <h1>
          <Button asChild variant="link" className="p-0 font-bold text-lg">
            <Link to="/">{"@sronnaim"}</Link>
          </Button>
        </h1>
        <Button
          className="font-symbols text-lg h-fit aspect-square"
          variant="ghost"
          onClick={themeToggleFn}
          style={{ fontVariationSettings: "'wght' 600" }}
        >
          {Theme.DARK === theme ? "light_mode" : "dark_mode"}
        </Button>
      </span>
    </nav>
  );
}
