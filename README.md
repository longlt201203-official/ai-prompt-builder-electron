# Electron + TypeScript + React + TanStack Router + Shadcn/ui

A modern Electron application boilerplate combining the power of Electron with React, TypeScript, TanStack Router, and Shadcn/ui components, built with Vite for fast development.

For manual set up, please read [this guide](./manual-set-up.md).

## Features

- **Electron**: Desktop application framework
- **TypeScript**: Type-safe development
- **React 19**: Modern React with latest features
- **TanStack Router**: Type-safe routing for React
- **Shadcn/ui**: Beautiful and accessible UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **Electron Forge**: Complete toolchain for Electron applications

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Getting Started

### Installation

```shell
npm install
```

### Development

Start the development server:

```shell
npm start
```

This will launch the Electron application in development mode with hot reload enabled.

### Building

Package the application:

```shell
npm run package
```

Create distributables for your platform:

```shell
npm run make
```

## Project Structure

```
src/
├── app/                    # React application
│   ├── components/         # Reusable UI components
│   │   └── ui/            # Shadcn/ui components
│   ├── lib/               # Utility functions
│   ├── routes/            # TanStack Router routes
│   ├── index.css          # Global styles
│   └── main.tsx           # React application entry point
├── native/                # Native API layer
│   ├── apis/              # Native API implementations
│   │   ├── readdir.ts     # File system directory reading
│   │   └── say-hi.ts      # Example native function
│   ├── constants.ts       # API constants
│   ├── native-api.ts      # Native API registry
│   └── types.ts           # TypeScript definitions
├── main.ts               # Electron main process
├── preload.ts            # Electron preload script
└── renderer.ts           # Electron renderer entry point
```

## Architecture

### App Layer

The `app` folder contains the React application with:

- **TanStack Router**: File-based routing with type safety
- **Shadcn/ui**: Pre-built accessible components
- **Tailwind CSS**: Styling with utility classes
- **TypeScript**: Full type safety throughout

### Native Layer

The `native` folder provides a bridge between the React frontend and Node.js/Electron APIs:

- **API Handlers**: Modular native functions (e.g., file system operations)
- **Type Safety**: TypeScript definitions for all native APIs
- **IPC Communication**: Secure communication between renderer and main processes

### Electron Processes

- **Main Process** (`main.ts`): Controls application lifecycle and creates renderer processes
- **Preload Script** (`preload.ts`): Securely exposes native APIs to the renderer
- **Renderer Process** (`renderer.ts`): Hosts the React application

## Available Native APIs

### Say Hi API

```typescript
nativeAPI.invokeNativeAPI(NATIVE_API_SAY_HI, "Your Name");
```

### Read Directory API

```typescript
nativeAPI.invokeNativeAPI(NATIVE_API_READDIR, "/path/to/directory");
```

## Adding New Native APIs

1. Create a new API handler in `src/native/apis/`
2. Add the API constant to `src/native/constants.ts`
3. Register the API in `src/native/native-api.ts`
4. Use the API in your React components

## Development Tips

- The application automatically opens DevTools in development mode
- Hot reload is enabled for both main and renderer processes
- Use the TanStack Router DevTools for debugging routes
- All native APIs are type-safe through TypeScript

## Tech Stack

- **Runtime**: Electron 37.2.3
- **Frontend**: React 19 + TypeScript
- **Routing**: TanStack Router
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: Electron Forge
- **Linting**: ESLint with TypeScript support

## License

MIT License

## Author

longlt201203
