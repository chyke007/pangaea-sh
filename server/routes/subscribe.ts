import express from "express";
import  Base from "../controller";

const apiRouter = express.Router();

apiRouter.get("/:uri",  () => { console.log("Get all subscribers details");} );

export default apiRouter;
