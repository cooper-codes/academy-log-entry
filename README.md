# Monorepo Project

This monorepo contains two main applications: an API built with Node.js, Express, and Apollo GraphQL, and a frontend application built with React, Tailwind CSS, and Vite. The project is managed using Turborepo and pnpm.

## Project Structure

```
monorepo-project
├── apps
│   ├── api          # API application
│   └── frontend     # Frontend application
├── packages
│   └── shared       # Shared utilities and types
├── package.json     # Root configuration for the monorepo
├── pnpm-workspace.yaml # Workspace configuration for pnpm
└── turbo.json       # Configuration for Turborepo
```

## Getting Started

To get started with the project, follow these steps:

1. **Install Dependencies**: Run the following command in the root directory of the monorepo to install all dependencies:

   ```
   pnpm install
   ```

2. **Run the API**: Navigate to the API application directory and start the server:

   ```
   cd apps/api
   pnpm start
   ```

3. **Run the Frontend**: In a new terminal, navigate to the frontend application directory and start the development server:

   ```
   cd apps/frontend
   pnpm dev
   ```

## Development

- The API is built using Express and Apollo GraphQL. You can find the GraphQL schema and resolvers in the `apps/api/src` directory.
- The frontend is built using React and Vite, with styles managed by Tailwind CSS. The main application files are located in the `apps/frontend/src` directory.

## Shared Code

The `packages/shared` directory contains shared utilities and types that can be used by both the API and frontend applications.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.