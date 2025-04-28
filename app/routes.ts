import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blogs", "routes/blogs/layout.tsx", [
    index("routes/blogs/home.tsx"),
    route(":slug", "routes/blogs/post.tsx"),
  ]),
  route("projects", "routes/projects/home.tsx"),
  route("actions/theme", "routes/actions/theme.ts"),
] satisfies RouteConfig;
