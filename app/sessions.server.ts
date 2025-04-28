import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";
import { ENV } from "./lib/env";

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [ENV.COOKIE_SECRET],

    // always true because IDX uses https anyway
    secure: true,
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);

export const clientSession = createCookieSessionStorage({
  cookie: {
    name: "client-session",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [ENV.COOKIE_SECRET],
    secure: true,
  },
});
