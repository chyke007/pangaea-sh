import express from "express";
import supertest from "supertest";
import { publishServer, subscribeServer} from "../server/";

const app = express();
// Link to your server file
const request = supertest(app);
app.use(publishServer);
export { app, request };
