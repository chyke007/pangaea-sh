import express from "express";

const apiRouter = express.Router();

apiRouter.post("/subscribe/:topic", () => {
  console.log("Subscribe endpoint");
});

export default apiRouter;
