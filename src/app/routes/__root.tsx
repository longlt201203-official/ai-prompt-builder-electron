import { Link, createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="p-2 border-b flex gap-4 items-center flex-wrap">
        <Link to="/" activeProps={{ className: "font-bold" }}>
          Home
        </Link>
        <Link to="/settings" activeProps={{ className: "font-bold" }}>
          Settings
        </Link>
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
