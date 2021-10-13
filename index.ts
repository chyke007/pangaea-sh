import * as dotenv from "dotenv";
dotenv.config();
import { publishServer, subscribeServer } from "./server";

const publish_port = process.env.PUBLISH_PORT || 8000;
publishServer.listen(publish_port, () => {
  // eslint-disable-next-line no-console
  console.log("Publisher Server running on port", `${publish_port}`);
});

const subscribe_port = process.env.SUBSCRIBE_PORT || 9000;
subscribeServer.listen(subscribe_port, () => {
  // eslint-disable-next-line no-console
  console.log("Subscriber Server running on port", `${subscribe_port}`);
});