import express from "express";
import  Base from "../controller";

const apiRouter = express.Router();

apiRouter.post("/subscribe/:topic",  Base.subscribe );

apiRouter.post("/publish/:topic", () => {
  console.log("Publish endpoint");
});

export default apiRouter;
