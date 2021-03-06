//require('dotenv').config();
import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';  //, { Application }
import http from 'http';
import { typeDefs, resolvers } from './graphql';
//import { DocumentNode } from 'graphql';
//import { IResolvers } from "@graphql-tools/utils";

//async function startApolloServer(typeDefs: DocumentNode, resolvers: IResolvers) {
async function startApolloServer(typeDefs, resolvers) {
  try {
    const db = await connectDatabase();

    // Required logic for integrating with Express
    const app = express();
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ db }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
      app,

      // By default, apollo-server hosts its GraphQL endpoint at the
      // server root. However, *other* Apollo Server packages host it at
      // /graphql. Optionally provide this to match apollo-server.
      path: '/'
    });

    // Modified server startup
    await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);

    const listings = await db.listings.find({}).toArray();
    //console.log("🚀 ~ file: index.ts ~ line 45 ~ startApolloServer ~ listings", listings)
    //console.log('listings[0].title: ', listings[0].title);

  } catch (error) {
    console.log(error);
  }
}

startApolloServer(typeDefs, resolvers);