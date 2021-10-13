// eslint-disable-next-line no-unused-vars
import { Response, Request, NextFunction } from "express";
import {
  customResult,
  customException,
  NO_URL,
  BODY_MUST_CONTAIN,
  TOPIC_NO_SUBSCRIBERS,
  MESSAGE_PUBLISHED,
  runIt,
  URL_ALREADY_SUBSCRIBED
} from "../../server/utils";
import { Pub, Sub } from "../model";


 
/* eslint func-names: ["error", "never"] */
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * Publishes to all subscribers in a topic
 */
 const publish = async function (req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  let { params: { topic } } = req;
  topic = topic.toLowerCase();

  if(body && Object.keys(body).length === 0 && body.constructor === Object){
    res.status(400);
    return res.json(customException(BODY_MUST_CONTAIN));
   }

  const sub = await Sub.findOne({ topic });
  if(!sub){
    res.status(4041);
    return res.json(customException(TOPIC_NO_SUBSCRIBERS));
  }

  await Promise.all(
      sub.url.map(async (t: string) => {
      await runIt({
        data: body,
        topic
      },t);
      })
  );

  return res.json(customResult(MESSAGE_PUBLISHED));
  };


/* eslint func-names: ["error", "never"] */
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * Subscribes url to a topic
 */
const subscribe = async function (req: Request, res: Response, next: NextFunction) {
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

  export { publish, subscribe };