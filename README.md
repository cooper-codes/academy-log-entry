# Monorepo Project

This monorepo contains two main applications: an API built with Node.js, Express, and Apollo GraphQL, and a frontend application built with React, Tailwind CSS, and Vite. The project is managed using Turborepo and pnpm.

## Project Structure

```
monorepo-project
├── apps
│   ├── api          # API application
│   └── frontend     # Frontend application
├── package.json     # Root configuration for the monorepo
├── pnpm-workspace.yaml # Workspace configuration for pnpm
└── turbo.json       # Configuration for Turborepo
```

## Getting Started

To get started with the project, follow these steps:

1. **Install Dependencies**: Run the following command in the root directory of the monorepo to install all dependencies:

   ```sh
   pnpm install
   
   ```

1. **Run the API and Frontend App**: From the project root:

   ```sh
   pnpm dev
   ```

1. **Run the API**: Navigate to the API application directory and start the server:

   ```sh
   cd apps/api
   pnpm dev
   ```

1. **Run the Frontend**: In a new terminal, navigate to the frontend application directory and start the development server:

   ```sh
   cd apps/web
   pnpm dev
   ```

## Development

- The API is built using Express and Apollo GraphQL. You can find the GraphQL schema and resolvers in the `apps/api/src/graphql` directory.
- The frontend is built using React and Vite, with styles managed by Tailwind CSS. The main application files are located in the `apps/web/src` directory.
