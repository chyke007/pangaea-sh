// eslint-disable-next-line no-unused-vars
import { Response, Request, NextFunction } from "express";
import {
  customResult,
  customException,
  NO_URL,
  URL_ALREADY_SUBSCRIBED
} from "../../server/utils";
import {Pub,Sub} from "../model";

/* eslint func-names: ["error", "never"] */
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const subscribe = async function (req:Request, res:Response, next:NextFunction) {
    const { body } = req;
    let { params: { topic } } = req;
    topic = topic.toLowerCase();
    if (!("url" in body)) {
          res.status(400);
          return res.json(customException(NO_URL));
    }
    const sub = await Sub.findOne({ topic });

    if (!sub) {
      const newSub = await new Sub({
        topic,
        url:[body.url]
      });
      newSub.save();
      return res.json(customResult(newSub));
    }

    if(sub.url.includes(body.url)){
      res.status(400);
      return res.json(customException(URL_ALREADY_SUBSCRIBED));
    }

   const updatedSub = await Sub.findOneAndUpdate({topic},
    { "$push": { "url": body.url } },
    { "new": true, "upsert": true });

    return res.json(customResult(updatedSub));
   
  };

  export { subscribe };