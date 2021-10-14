import { request } from "../index";
import db from "../setup/db";

import {
    ERROR, 
    SUCCESS,
    BODY_MUST_CONTAIN,
    MESSAGE_PUBLISHED,
    TOPIC_NO_SUBSCRIBERS
    } from "../../server/utils";
  
    
  const data1 = {
    "url": "http://localhost:8000/event"
  };
  const data2 = {
      "url": "http://localhost:8000/event2"
    };

  const pubData1 = {
    "message":"hello"
};
    const pubData2 = {
        "msg":"hello"
    };

    /**
   * Validate route
   */
  describe("validate route test - pub", () => {

    // Connects to test database
    db.setupDB();
        
    it("should respond with HTTP 200", async (done) => {
        const topic = "topic1";
        let response = await request.post(`/subscribe/${topic}`)
        .send(data1)
        .set("Accept", "application/json");

       response = await request.post(`/publish/${topic}`)
      .send(pubData1)
      .set("Accept", "application/json");
      expect(response.body.status).toBe(SUCCESS);
      expect(response.body.data).toBe(MESSAGE_PUBLISHED);
      
      expect(response.status).toBe(200);
      done();
    });
  });  

