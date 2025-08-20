import { Link, createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="p-2 border-b flex gap-3">
        <Link to="/" activeProps={{ className: "font-bold" }}>
          Home
        </Link>
        <Link to="/settings" activeProps={{ className: "font-bold" }}>
          Settings
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
