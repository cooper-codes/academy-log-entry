import "reflect-metadata"; // For TypeGraphQL + needs to be first

import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";
import Container from "typedi";

import getSchema from './graphql';
import { DataSourceProvider } from "./dal/dataSource";

export const createServer = async () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan(process.env.NODE_ENV !== 'production' ? "dev" : "combined"))

  // Simple health check endpoint
  app.use('/status', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Init the data source
  await Container.get(DataSourceProvider).initialize();

  const schema = await getSchema();

  const server = new ApolloServer({ schema });

  await server.start();

  app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server),);

  const PORT = process.env.PORT || 4000;

  return app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};


