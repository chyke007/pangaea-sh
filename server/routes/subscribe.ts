import express from "express";
import  Base from "../controller";

const apiRouter = express.Router();

apiRouter.get("/:uri",  Base.get );
apiRouter.post("/:uri",  Base.post );

export default apiRouter;
