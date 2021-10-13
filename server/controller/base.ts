// eslint-disable-next-line no-unused-vars
import { Response, Request, NextFunction } from "express";
import {
  customResult,
  customException,
  runIt,
  NO_URL,
  BODY_MUST_CONTAIN,
  TOPIC_NO_SUBSCRIBERS,
  MESSAGE_PUBLISHED,
  UNKNOWN_ERROR,
  URL_ALREADY_SUBSCRIBED
} from "../../server/utils";
import { Pub, Sub } from "../model";


/* eslint func-names: ["error", "never"] */
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
 const get = async function (req:Request, res:Response, next:NextFunction) {
  try{
    const { params: { uri } } = req;
    const sub = await Pub.find({ uri });
    
    return res.json(customResult(sub));
  }catch(e){
    res.status(400);
    res.json(customException(UNKNOWN_ERROR));
  }
};

/* eslint func-names: ["error", "never"] */
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * Saves the payload containing data, topic to collection
 */
 const post = async function (req: Request, res: Response, next: NextFunction) {
  try{
  const { body: { data, topic } } = req;
  const { params: { uri } } = req;

  const newPub = await new Pub({
    uri,
    data,
    topic
  });
  newPub.save();    
  return res.json(customResult(newPub));

  } catch(e){
    res.status(400);
    res.json(customException(UNKNOWN_ERROR));
  } 

};

 
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
    res.status(404);
    return res.json(customException(TOPIC_NO_SUBSCRIBERS));
  }

  await Promise.all(
      sub.url.map(async (t: string) => {
      runIt({
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

  export { get, post, publish, subscribe };