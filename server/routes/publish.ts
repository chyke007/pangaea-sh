import express from "express";

const apiRouter = express.Router();

apiRouter.post("/publish/:topic", () => {
  console.log("Publish endpoint");
});

export default apiRouter;
