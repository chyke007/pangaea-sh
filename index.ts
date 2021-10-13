import * as dotenv from "dotenv";
dotenv.config();
import server from "./server";

const port = process.env.PORT || 9000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Server running on port", `${port}`);
});