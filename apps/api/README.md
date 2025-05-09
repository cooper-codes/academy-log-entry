# API Documentation

This is the API for the monorepo project, built using Node.js, Express, and Apollo GraphQL.

## Getting Started

To get started with the API, follow these steps:

1. **Install Dependencies**: Run the following command to install the necessary dependencies:

   ```sh
   pnpm install
   ```

2. **Run the API**: Start the API server using the following command:

   ```sh
   pnpm dev
   ```

3. **Access the GraphQL Playground**: Once the server is running, you can access the GraphQL Playground at `http://localhost:4000/graphql`.

## Project Structure

- `src/index.ts`: Entry point for the API application, initializes the Express server and Apollo Server.
- `src/graphql/resolvers/`: Contains resolver functions for the GraphQL schema.

## Scripts

- `dev`: Runs the API server in dev mode.
- `build`: Compiles the TypeScript code.
