import express from "express";
import  Base from "../controller";

const apiRouter = express.Router();

apiRouter.get("/:uri",  () => { console.log("Get all subscribers details");} );
apiRouter.post("/:uri",  () => { console.log("Post to all subscribers details");} );

export default apiRouter;
