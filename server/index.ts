import express  from "express";
import { publishRouter, subscribeRouter } from "./routes";

const server = express();
import { Setup, Mongo } from "./middleware";

// setup MongoDb
Mongo();

// setup global middleware
Setup(server);
const publishServer = server;
const subscribeServer = server;

// api router
publishServer.use("/", publishRouter);
subscribeServer.use("/", subscribeRouter);

export {
  publishServer,
  subscribeServer
};