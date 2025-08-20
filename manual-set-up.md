# Manual Set Up Guide

## Create Electron Project

I use [Vite + Typescript](https://www.electronforge.io/templates/vite-+-typescript) template for creating this template:

```shell
npx create-electron-app@latest my-new-app --template=vite-typescript
```

## Set up React

Add React to your project with [this guide](https://www.electronforge.io/guides/framework-integration/react-with-typescript):

1. Install dependencies

```shell
npm install --save react react-dom
npm install --save-dev @types/react @types/react-dom @vitejs/plugin-react
```

2. Update `vite.renderer.config.ts`

- Change name from `vite.renderer.config.ts` to `vite.renderer.config.mts`
- Add vite react plugin:

```typescript
//...
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

3. Update `index.html`

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/renderer.ts"></script>
  </body>
</html>
```

4. Create `app` folder and create `app/main.tsx`

```typescript
import { createRoot } from 'react-dom/client';

const root = createRoot(document.body);
root.render(<h2>Hello from React!</h2>);
```

5. Import `app/main.tsx` to `renderer.ts`

```typescript
import "./app/main";
```

## Set up Tanstack Router

I follow these guides to set up Tanstack Router:

- [Installation](https://tanstack.com/router/latest/docs/framework/react/installation)
- [Manual Setup](https://tanstack.com/router/latest/docs/framework/react/quick-start#manual-setup)

1. Install dependencies:

```shell
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
```

2. Configure Vite Plugin (`vite.renderer.config.mts`)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      routesDirectory: path.resolve(__dirname, "./src/app/routes"),
      generatedRouteTree: path.resolve(__dirname, "./src/app/routeTree.gen.ts"),
    }),
    react(),
  ],
});
```

3. Update `app/main.tsx`

```typescript
import "./index.css";

import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={router} />);
```

_NOTE_: Don't worry about the missing file `routeTree.gen.ts` because it will be automatically generated when you start the application

Tanstack Router is basically done, you should check their [document](https://tanstack.com/router/latest) for more usages.

## Set up Shadcn

I follow these guide to set up Shadcn to my project:

- [TailwindCSS using Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Shadcn Manual](https://ui.shadcn.com/docs/installation/manual)

1. Install dependecies

```shell
npm install tailwindcss @tailwindcss/vite
npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

2. Config TailwindCSS (`vite.renderer.config.mts`)

```typescript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      routesDirectory: path.resolve(__dirname, "./src/app/routes"),
      generatedRouteTree: path.resolve(__dirname, "./src/app/routeTree.gen.ts"),
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

3. Update `tsconfig.json`

```json
{
  "compilerOptions": {
    // Add these 2 options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

4. Update `app/index.css`

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

5. Add a cn helper `src/app/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

6. Create `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "./src/app/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/app/components",
    "utils": "@/app/lib/utils",
    "ui": "@/app/components/ui",
    "lib": "@/app/lib",
    "hooks": "@/app/hooks"
  },
  "iconLibrary": "lucide"
}
```

Now you can add components to your project:

```shell
npx shadcn@latest add button
```

## Set up Native APIs

1. Create folder `native` with the following structure:

```
native
  | apis
  | constants.ts
  | index.d.ts
  | native-api.ts
  | types.ts
```

2. Define handler (`types.ts`)

```typescript
import { IpcMainInvokeEvent } from "electron";

export type NativeAPIHandler = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => any;
```

3. Declare namespace (`index.d.ts`)

```typescript
declare namespace nativeAPI {
  function invokeNativeAPI(channel: string, message: any): Promise<any>;
}
```

4. Declare handler map (`native-api.ts`)

```typescript
import { NativeAPIHandler } from "./types";

const nativeAPI: Record<string, NativeAPIHandler> = {};

export default nativeAPI;
```

5. Expose native apis (`preload.ts`)

```typescript
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("nativeAPI", {
  invokeNativeAPI: (channel: string, message: any) =>
    ipcRenderer.invoke(channel, message),
});
```

6. Handle the api call from main process `main.ts`

```typescript
import nativeAPI from "./native/native-api";

app.on("ready", () => {
  Object.entries(nativeAPI).forEach(([key, val]) => ipcMain.handle(key, val));
  createWindow();
});
```

7. Add the sample API

- Create `apis/say-hi.ts`

```typescript
import { NativeAPIHandler } from "../types";

const sayHi: NativeAPIHandler = (event, name) => {
  console.log(`Hi ${name}!`);
};

export default sayHi;
```

- Declare the api's name (`constants.ts`)

```typescript
export const NATIVE_API_SAY_HI = "nativeAPI:sayHi";
```

- Add the api to the `nativeAPI` map (`native-api.ts`)

```typescript
import sayHi from "./apis/say-hi";
import { NATIVE_API_SAY_HI } from "./constants";
import { NativeAPIHandler } from "./types";

const nativeAPI: Record<string, NativeAPIHandler> = {
  [NATIVE_API_SAY_HI]: sayHi,
};

export default nativeAPI;
```

8. Call the API from React App

```typescript
nativeAPI.invokeNativeAPI(NATIVE_API_SAY_HI, "Long");
```
