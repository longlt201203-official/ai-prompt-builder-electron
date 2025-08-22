import "./index.css";

import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const history = createMemoryHistory({ initialEntries: ["/"] });

// Create a new router instance
const router = createRouter({ routeTree, history });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={router} />);
