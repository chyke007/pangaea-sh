import express  from "express";
import apiRouter from "./routes/";

const server = express();
import { Setup, Mongo } from "./middleware";

// setup MongoDb
Mongo();

// setup global middleware
Setup(server);


// api router
server.use("/", apiRouter);

export default server;