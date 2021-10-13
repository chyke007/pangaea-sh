import express from "express";
import  Base from "../controller";

const apiRouter = express.Router();

apiRouter.post("/subscribe/:topic",  Base.subscribe );

apiRouter.post("/publish/:topic",  Base.publish );

export default apiRouter;
