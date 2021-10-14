import { request } from "../index";
import db from "../setup/db";

import {
    ERROR, 
    SUCCESS, 
    URL_ALREADY_SUBSCRIBED,
    NO_URL
    } from "../../server/utils";
  
  const data1 = {
      "url": "http://localhost:8000/event"
    };
    const data2 = {
        "url": "http://localhost:8000/event2"
      };

    /**
   * Validate route
   */
  describe("validate route test", () => {

    // Connects to test database
    db.setupDB();
    
    it("should respond with HTTP 200", async (done) => {
      const topic = "topic1";
      const response = await request.post(`/subscribe/${topic}`)
      .send(data1)
      .set("Accept", "application/json");
      expect(response.body.status).toBe(SUCCESS);
      expect(response.body.data.url[0]).toBe(data1.url);
      expect(response.body.data.topic).toBe(topic);
      
      expect(response.status).toBe(200);
      done();
    });

    it("should respond with HTTP 200 for topic with more than 1 url", async (done) => {
        const topic = "topic1";
        let response = await request.post(`/subscribe/${topic}`)
        .send(data1)
        .set("Accept", "application/json");
        expect(response.body.status).toBe(SUCCESS);
        expect(response.body.data.url[0]).toBe(data1.url);
        expect(response.body.data.topic).toBe(topic);

        response = await request.post(`/subscribe/${topic}`)
        .send(data2)
        .set("Accept", "application/json");
        expect(response.body.status).toBe(SUCCESS);
        expect(response.body.data.url.length).toBe(2);
        expect(response.body.data.url).toContain(data2.url);
        expect(response.body.data.topic).toBe(topic);
        expect(response.status).toBe(200);

        done();
      });

      it("should respond with HTTP 400 for missing url field in body", async (done) => {
        const topic = "topic1";
        const response = await request.post(`/subscribe/${topic}`)
        .send({})
        .set("Accept", "application/json");
        expect(response.body.status).toBe(ERROR);
        expect(response.body.message).toBe(NO_URL);
        expect(response.body.data).toBe(null);
        expect(response.status).toBe(400);

        done();
      });

      it("should respond with HTTP 400 when trying to subscribe same url to topic", async (done) => {
        const topic = "topic1";
        let response = await request.post(`/subscribe/${topic}`)
        .send(data1)
        .set("Accept", "application/json");
        expect(response.body.status).toBe(SUCCESS);
        expect(response.body.data.url[0]).toBe(data1.url);
        expect(response.body.data.topic).toBe(topic);

        response = await request.post(`/subscribe/${topic}`)
        .send(data1)
        .set("Accept", "application/json");
        expect(response.body.status).toBe(ERROR);
        expect(response.body.message).toBe(URL_ALREADY_SUBSCRIBED);
        expect(response.body.data).toBe(null);
        expect(response.status).toBe(400);

        done();
      });

      it("should respond with HTTP 200 for empty url", async (done) => {

        const response = await request.get(`/${data1.url.split("/")[3]}`)
        .set("Accept", "application/json");
        expect(response.body.status).toBe(SUCCESS);
        expect(response.body.data.length).toBe(0);

        expect(response.status).toBe(200);

        done();
      });

  });  

