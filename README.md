# Log Entry Project

This monorepo contains two main applications: an API built with Node.js, Express, and Apollo GraphQL, and a frontend application built with React, Tailwind CSS, and Vite. The project is managed using Turborepo and pnpm.

## Project Structure

```graph
monorepo-project
├── apps
│   ├── api             # API application
│   └── web             # Frontend application
├── package.json        # Root configuration for the monorepo
├── pnpm-workspace.yaml # Workspace configuration for pnpm
└── turbo.json          # Configuration for Turborepo
```

## Perquisites

- Make sure you have `pnpm` installed locally. You can find instructions [here](https://pnpm.io/installation).
- Make sure you have Node version 20 or newer installed; (Tested on 20 & 22)

## Getting Started

To get started with the project, follow these steps:

1. **Install Dependencies**: Run the following command in the root directory of the monorepo to install all dependencies:

   ```sh
   pnpm install
   
   ```

   > **_NOTE:_** If you run into any issues building or running the app you may have to run the following command:

   ```sh
   pnpm approve-builds
   ```

1. **Run the API and Frontend App**: From the project root:

   ```sh
   pnpm dev
   ```

   The frontend is viewable at [http://localhost:8080](http://localhost:8080)
   The backend is viewable at [http://localhost:4000/graphql](http://localhost:4000/graphql)

1. **Run tests**: From the project root:

   ```sh
   pnpm test
   ```

1. **Run just the API**: Navigate to the API application directory and start the server:

   ```sh
   pnpm dev --filter api
   ```

1. **Run just the Frontend**: In a new terminal, navigate to the frontend application directory and start the development server:

   ```sh
    pnpm dev --filter web
   ```

## Development

### Backend

 For the backend portion I followed "traditional" engineering practices; I roughly based the main monorepo and the api layer on a turborepo maintained starter (e.g. `pnpm dlx create-turbo@latest --example with-docker`) with quite a few modifications and pruning. The majority of the code is hand written and not with AI.

- You can find the GraphQL schema and resolvers in the `apps/api/src/graphql` directory.
- The DAL is in `apps/api/src/dal`.

### Frontend

For the frontend app I chose to use an AI first approach. The majority of the code is written using [lovable](https://lovable.dev). However, much pruning and modification was required to reduce complexity, fix bugs, deduplicate and to make the logic work as expected.

- The main application files are located in the `apps/web/src` directory.
- The files in `apps/web/src/components/shared` directory can be thought of the UI library files or candidates for hoisting to said library
