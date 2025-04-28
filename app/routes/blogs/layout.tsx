import { Outlet } from "react-router";

export function meta() {
  return [
    { title: "blogs | @sronnaim" },
    { content: "Welcome to my personal website!" },
  ];
}

export default function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}
