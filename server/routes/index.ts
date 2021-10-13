import express from "express";

const apiRouter = express.Router();

apiRouter.post("/subscribe/:topic", () => {
  console.log("Subscribe endpoint");
}).post("/publish/:topic", () => {
  console.log("Publish endpoint");
});

export default apiRouter;