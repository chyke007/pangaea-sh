import axios from "axios";
import { SUCCESS, ERROR} from "./constant";

//Interfaces
export interface CustomEx {
    message: string,
    status: string,
    data: any
}

//Methods

/**
 * Customizes message payload to send once value is found
 * @param  {any} data
 * @return {Object}
 */
export const customResult = (data: any) => {
    return  {
        status: SUCCESS,
        data
      };
};

/**
 * Send error payload to user
 * @param  {string} message
 * @return {Object}
 */
export const customException = (message: string): CustomEx => {
    return  {
         message,
         status: ERROR,
         data: null
       };
};

/**
 * Performs Curl request
 *  @param  {Request} req
 *  @param  {any} data
 * @param  {string} url
 * @return {Object}
 */
 export const runIt = async (data: any, url: string ) => {
   await axios({
    method: "post",
    url,
    data 
  });
  return;
 };
