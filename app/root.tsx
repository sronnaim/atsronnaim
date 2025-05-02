import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Theme, ThemeProvider, useTheme } from "remix-themes";
import { Navbar } from "./components/navbar";
import { CommandLine } from "./components/command-line";

export function meta({ error }: Route.MetaArgs): Route.MetaDescriptors {
  if (error) {
    let title = 'shoot... | @sronnaim'
    let name = 'Error'
    let content = 'Unexpected error happened'

    if (isRouteErrorResponse(error) && error.status === 404) {
      title = 'not found | @sronnaim'
      name = 'Not found'
      content = 'Content or page not found'
    }

    return [ { title, name, content } ]
  }

  return [{ title: '@sronnaim' }, { name: 'Home', content: 'Welcome to my personal portfolio website!' }]
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  // Material Symbols entire variable fonts
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
  },
  // Space Mono
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
];

const AppWithProviders = ({
  theme,
  children,
}: {
  theme: Theme | null;
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/actions/theme">
      {children}
    </ThemeProvider>
  );
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppWithProviders theme={Theme.DARK}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        {children}
      </html>
    </AppWithProviders>
  );
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const isDark = theme === Theme.DARK;

  const onThemeToggle = () => {
    setTheme(isDark ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <body
      className={`${isDark && "dark"} flex flex-col m-auto min-h-screen items-center bg-background text-foreground`}
    >
      <Navbar themeToggleFn={onThemeToggle} theme={theme} />
      <main className="w-3/4 sm:w-2/3 max-w-2xl flex flex-col justify-center grow gap-40 text-base font-normal ps-10 py-20">
        <Outlet />
      </main>
      <ScrollRestoration />
      <Scripts />
    </body>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "Nope, nothing is here"
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <body
      className={`dark flex flex-col m-auto min-h-screen items-center bg-background text-foreground`}
    >
      <main className="w-3/4 sm:w-2/3 max-w-2xl flex flex-col justify-center grow gap-40 text-base font-normal ps-10 py-20">
        <CommandLine variant="danger" aria-hidden />
        <p>{`${message} ${details}`}</p>
        <pre className="w-full overflow-auto">
          <code>{stack}</code>
        </pre>
      </main>
      <ScrollRestoration />
      <Scripts />
    </body>
  );
}
